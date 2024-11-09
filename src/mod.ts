import { DependencyContainer } from "@spt/models/external/tsyringe";
import { IPreSptLoadMod } from "@spt/models/external/IPreSptLoadMod";
import { StaticRouterModService } from "@spt/services/mod/staticRouter/StaticRouterModService";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";
import * as config from "../config/config.json";

class RandomSkillLevelAndMasteringMod implements IPreSptLoadMod {
    private logger: ILogger;

    preSptLoad(container: DependencyContainer): void {
        const staticRMS = container.resolve<StaticRouterModService>("StaticRouterModService");
        const profileHelper = container.resolve<ProfileHelper>("ProfileHelper");
        this.logger = container.resolve<ILogger>("WinstonLogger");

        const logMessage = (message: string, color: LogTextColor = LogTextColor.GREEN) => {
            this.logger.logWithColor(`[Random skill level and mastering] ${message}`, color);
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

        const updateMastering = (pmcProfile: any) => {
            if (!pmcProfile.Skills?.Mastering) {
                pmcProfile.Skills.Mastering = [];
            }

            const group = pmcProfile.Info.Side === "Bear" ? "Bear" : "USEC";
            const weapons = config.Mastering[group];
            if (!weapons) return;

            weapons.forEach((weaponId: string) => {
                let weaponMastery = pmcProfile.Skills.Mastering.find((w: any) => w.Id === weaponId);
                if (!weaponMastery) {
                    weaponMastery = { Id: weaponId, Progress: 0 };
                    pmcProfile.Skills.Mastering.push(weaponMastery);
                }
                if (weaponMastery.Progress <= config.minMasteringLevel) {
                    const randomMastering = Math.floor(Math.random() * (config.maxMasteringLevel - config.minMasteringLevel + 1)) + config.minMasteringLevel;
                    weaponMastery.Progress = randomMastering;
                    logMessage(`${weaponId} mastering level updated to: ${randomMastering}`);
                }
            });
        };

        const profileAction = async (url: any, info: any, sessionID: any, output: any, actionName: string) => {
            try {
                const pmcProfile = profileHelper.getPmcProfile(sessionID);
                if (hasSkills(pmcProfile)) {
                    updateSkills(pmcProfile);
                    updateMastering(pmcProfile);
                } else {
                    logMessage(`PMC Profile or Skills not created yet during ${actionName}. Skipping updates.`, LogTextColor.YELLOW);
                }
            } catch (error) {
                logMessage(`Error during ${actionName}: ${error.message}`, LogTextColor.RED);
            }
            return output;
        };

        staticRMS.registerStaticRouter(
            "RandomSkillLevelAndMasteringMod_GameStart",
            [
                {
                    url: "/client/game/start",
                    action: async (url, info, sessionID, output) => profileAction(url, info, sessionID, output, "game start")
                }
            ],
            "aki"
        );

        staticRMS.registerStaticRouter(
            "RandomSkillLevelAndMasteringMod_ProfileCreate",
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

module.exports = { mod: new RandomSkillLevelAndMasteringMod() };
