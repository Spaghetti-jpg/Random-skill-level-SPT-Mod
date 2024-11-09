import { DependencyContainer } from "@spt/models/external/tsyringe";
import { IPreSptLoadMod } from "@spt/models/external/IPreSptLoadMod";
import { StaticRouterModService } from "@spt/services/mod/staticRouter/StaticRouterModService";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";
import * as config from "../config/config.json";

class RandomSkillLevelMod implements IPreSptLoadMod {
    private logger: ILogger;

    preSptLoad(container: DependencyContainer): void {
        const staticRMS = container.resolve<StaticRouterModService>("StaticRouterModService");
        const profileHelper = container.resolve<ProfileHelper>("ProfileHelper");
        this.logger = container.resolve<ILogger>("WinstonLogger");

        const logMessage = (message: string, color: LogTextColor = LogTextColor.GREEN) => {
            this.logger.logWithColor(`[Random skill level] ${message}`, color);
        };

        const hasSkills = (pmcProfile: any) => pmcProfile?.Skills?.Common;

        const updateSkills = (pmcProfile: any) => {
            if (!hasSkills(pmcProfile)) {
                logMessage("Skills not found in profile.", LogTextColor.RED);
                return;
            }

            for (const skillId in config.Skills) {
                if (config.Skills[skillId]) {
                    const skill = pmcProfile.Skills.Common.find((s: any) => s.Id === skillId);
                    if (skill && skill.Progress <= config.minSkillLevel) {
                        const randomProgress = Math.floor(Math.random() * (config.maxSkillLevel - config.minSkillLevel + 1)) + config.minSkillLevel;
                        skill.Progress = randomProgress;
                        logMessage(`${skillId} skill was below minimum, changed to: ${randomProgress}`);
                    }
                }
            }
        };

        const profileAction = async (url: any, info: any, sessionID: any, output: any, actionName: string) => {
            try {
                const pmcProfile = profileHelper.getPmcProfile(sessionID);
                if (hasSkills(pmcProfile)) {
                    updateSkills(pmcProfile);
                } else {
                    logMessage(`PMC Profile or Skills not created yet during ${actionName}. Skipping skill updates.`, LogTextColor.YELLOW);
                }
            } catch (error) {
                logMessage(`Error during ${actionName}: ${error.message}`, LogTextColor.RED);
            }
            return output;
        };

        staticRMS.registerStaticRouter(
            "RandomSkillLevelMod_GameStart",
            [
                {
                    url: "/client/game/start",
                    action: async (url, info, sessionID, output) => profileAction(url, info, sessionID, output, "game start")
                }
            ],
            "aki"
        );

        staticRMS.registerStaticRouter(
            "RandomSkillLevelMod_ProfileCreate",
            [
                {
                    url: "/client/game/profile/create",
                    action: async (url, info, sessionID, output) => profileAction(url, info, sessionID, output, "profile creation")
                }
            ],
            "aki"
        );
    }
}

module.exports = { mod: new RandomSkillLevelMod() };
