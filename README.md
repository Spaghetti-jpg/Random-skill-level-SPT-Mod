# Random skill level and mastering
You're a professional PMC, not a baby

![alt text](https://raw.githubusercontent.com/Spaghetti-jpg/Random-skill-level-SPT-Mod/refs/heads/main/screenshot-1.png)

![alt text](https://raw.githubusercontent.com/Spaghetti-jpg/Random-skill-level-SPT-Mod/refs/heads/main/screenshot-2.png)

## [About](#about)

I really didn't like that we play for a PMC that went through many conflicts and didn't get any skills. This mod is designed to fix that because each person is individual in their skills, so each profile you create will have different skills.

You will no longer have to level up from scratch, your skills will be similar to the skills of a person who has completed training.

## A new profile is recommended!

Implemented a system for checking the selected faction in the profile. If you choose Bear, then the mastery of weapons will increase only for weapons common in the Russian army. If you choose USEC, then the mastery of weapons will increase for weapons common in NATO countries.

Simply put, Bear does not know how to handle NATO weapons, and USEC does not know how to handle Russian weapons

This mod only changes the skill and mastery level of weapons, which are zero. Each profile will have different skill and mastery levels.

## [Installation](#installation)

1. Drag the `user` folder from the zip archive into the SPT installation folder.

## [How to configure](#how-to-configure)

After installing the mod, open the `config.json` file and set the value to true or falls for the selected skills.

`true` - random skill level

`false` - Skill will remain at the same progress level

`minSkillLevel` contains the minimum skill level, by default equals 0

`maxSkillLevel` contains the maximum skill level, by default equals 3000

`minMasteringLevel` contains the minimum weapon mastering level, by default equals 0

`maxMasteringLevel` contains the maximum weapon mastering level, by default equals 1000

If you want to add a new weapon for some faction, then use the config.json file

## Vanilla `config.json`


```json{
{
  "minSkillLevel": 0,
  "maxSkillLevel": 3000,
  "minMasteringLevel": 0,
  "maxMasteringLevel": 1000,

  "Skills": {
    "Endurance": true,
    "Strength": true,
    "Vitality": true,
    "Health": true,
    "StressResistance": true,
    "Metabolism": true,
    "Immunity": true,
    "Perception": true,
    "Intellect": true,
    "Attention": true,
    "Charisma": true,
    "Memory": true,
    "Pistol": true,
    "Revolver": true,
    "SMG": true,
    "Assault": true,
    "Shotgun": true,
    "Sniper": true,
    "LMG": true,
    "HMG": true,
    "Launcher": true,
    "AttachedLauncher": true,
    "Throwing": true,
    "Melee": true,
    "DMR": true,
    "RecoilControl": true,
    "AimDrills": true,
    "TroubleShooting": true,
    "Surgery": true,
    "CovertMovement": true,
    "Search": true,
    "MagDrills": true,
    "Sniping": true,
    "ProneMovement": true,
    "LightVests": true,
    "HeavyVests": true,
    "WeaponModding": true,
    "AdvancedModding": true,
    "WeaponTreatment": true,
    "Freetrading": true,
    "Barter": true,
    "Crafting": false,
    "HideoutManagement": false
  },
    "Mastering": {
      "Bear": [
        "AK74",
        "AKM",
        "SVD",
        "VSS",
        "DVL",
        "KS23",
        "VSK94",
        "T5000",
        "SR2",
        "RPD"
      ],
      "USEC": [
        "M4",
        "MDR",
        "MPX",
        "MP5",
        "SA-58",
        "P90",
        "AXMC",
        "STM-9",
        "MP7",
        "SR25",
        "M1A"
      ]
  }
}
```


