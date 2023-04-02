## 15.1

**Q:** *How can I protect my vault from corruption, if I have to reinstall the game, or move to a new device?*

**A:** The game's method of doing so is cloud saving (not available on Bethesda Launcher version, available everywhere else I believe). For platforms that don't automatically cloud save simply check the box next to your vault in the vault list, and you will enable it. If you've reinstalled the game or are playing on a new device, check the box in the empty slot where your vault was, and a loading bar should come up as it downloads your vault from the cloud. That being said, I would **strongly** recommend manually backing up your vault every once in a while as well. People have had problems recovering their vaults from the cloud before, and if your game corrupts it's easy for the corrupt version to get saved to the cloud (and if you're not using the cloud or can't and it corrupts then you're screwed if you don't have a backup).

For all platforms see **[1.4](https://github.com/therabidsquirel/The-Fallout-Shelter-FAQ/wiki/Section-1:-Important-Information#14)** for where the game files are located.

- *Android:* Give robot9706's **[Android save editor](http://robot9706.github.io/FSSE/)** a look as it has a backup feature (along with many other useful editing features if you're interested). It apparently has permissions issues with trying to access your save file in newer Android versions, in which case its backup feature will be useless. You can alternatively copy the files yourself to somewhere else.

- *iOS:* I've got two methods here for transferring to and from thanks to two iOS users. The first, from Chelly:

    - Do a device backup via iTunes.
    - The filename will be hashed, that is, it will be some long string of letters and numbers. Using a backup explorer of your choice you can view what the hashes are for the actual filenames to find out which is the file you want.
    - Grab the save file. If you're doing this to use a save editor you'll want to rename it to `Vault1.sav`, do your stuff, then rename it back to exactly the same long string of letters and numbers.
    - Put the save you want back in the backup, with the correct hash as its filename.
    - Restore your device via iTunes.

    The other method is from an anonymous user. They've provided a detailed step-by-step, which they did on iOS version 11.4:

    - Backup your save to the cloud, just in case
    - Install the free **[iMazing](https://imazing.com/download)** for Windows or macOS
    - Temporarily disable Find My iPhone
    - Connect your iPhone to the computer
    - Unlock the phone and grant access to the computer
    - Open iMazing, but do not perform a full backup
    - Select Manage Apps
    - Click Device
    - Locate Fallout Shelter
    - Click Backup
    - Select Backup Destination
    - Click Next and let the backup complete
    - Rename the backup from iMazingapp to .zip
    - Extract the files from the backup
    - Open Documents
    - Grab any vault save file(s) and do any save editing you want at this point
    - Replace the vault save file(s), re-compress the files into a .zip, and rename it back to iMazingapp
    - Delete Fallout Shelter from your iOS device
    - Reinstall and launch the app, but don't start a new game or download any cloud saves
    - Close Fallout Shelter
    - Open iMazing
    - Select Manage Apps
    - Click Device
    - Locate Fallout Shelter
    - Restore App Data, choosing the Fallout Shelter.iMazingApp
    - Restore App
    - Open Fallout Shelter and you're good to go

- *Bethesda Launcher, Steam, and Windows 10:* It's easy enough to just manually copy files, copy the vault saves to wherever you want.

- *Xbox One:* The only way would be to sync your Xbox with a Windows 10 computer and then backup from there.

- *PS4:* It looks like it's possible to transfer files to and from a computer, and the PS4 probably has some cloud saving capability, but I don't know any details.

- *Nintendo Switch:* It looks like it might be possible to transfer files to and from a computer using a microSD card, and the Switch probably has some cloud saving capability, but I don't know any details.

## 15.2

**Q:** *Is there anyway to cheat or edit my vault?*

**A:** Yes:

- *Android:* robot9706's **[Android save editor](http://robot9706.github.io/FSSE/)** has all the editing and cheating options you could want for the game, and is very well-built and reliable. Among many features it includes a button to return all explorers from the wasteland, and a button to fix the game if you've messed with time. It apparently has permissions issues with trying to access your save file in newer Android versions, so I believe to work around that you have to copy the save file to another folder the FSSE does have access to, edit or do what you want, then copy the file back. You could also use the web-based editors mentioned in the Bethesda Launcher method.

- *iOS:* Refer to **[15.1](#151)** for how to transfer save files to a computer. Once on a computer you can easily use any save editor before transferring back to iOS, so refer to the Bethesda Launcher method for that.

- *Bethesda Launcher:* robot9706 also has a version of their **[save editor for Windows](http://robot9706.github.io/FSSE/)**, similar to their Android one. I also know of two web-based editors, **[rakion99's](https://rakion99.github.io/shelter-editor/)** and **[mrjerrye's](https://shelter.ellis.industries/)**. The former has the option to decrypt to or encrypt from JSON if you really know what you're doing and want to poke around, while the latter has the option to view a save in its JSON.

- *Steam:* The best way would be to locate the file (see **[1.4](https://github.com/therabidsquirel/The-Fallout-Shelter-FAQ/wiki/Section-1:-Important-Information#14)**) and use the Bethesda Launcher method.

- *Windows 10 and Xbox One:* The best way would be to sync with Windows 10, locate the vault there, transfer it to the Windows Bethesda launcher version, use the Bethesda Launcher method, then transfer it back. See **[1.4](https://github.com/therabidsquirel/The-Fallout-Shelter-FAQ/wiki/Section-1:-Important-Information#14)** for how to go about file location and transfer.

- *PS4:* While it looks like it's possible to transfer files to and from a computer, where you'd be able to edit them, it seems that save data on the PS4 is encrypted. In other words you'd need a way to decrypt and re-encrypt the data, which I don't think exists for this game. If anyone knows anything feel free to correct me.

- *Nintendo Switch:* It looks like it's possible to transfer files to and from a computer using a microSD card, where you'd be able to edit them, but I can't guarantee if it would actually work. If anyone knows anything feel free to correct me.

## 15.3

**Q:** *I've been away from the game for a while and my explorers will take many days/weeks to return, can I speed that up?*

**A:** See **[15.2](#152)**.

## 15.4

**Q:** *I've messed with my device/PC time and things are broken now! Can I fix them?*

**A:** It's fixable, but as always I don't recommend messing with device/PC in the first place. You've got two options:

Move time back however far you went forward. Say you moved it forward at most 7 months from today, then eventually reset back to the present time. To fix it, move time back 7 or more months from today, then be sure to open your vault with time in the past. Then just reset back to the present time, and that should resolve the issues the game's clock is having.

If that doesn't work, you'll have to use a save editor. Check **[15.2](#152)** for the breakdown by platform.

## 15.5

**Q:** *Are there any mods out there for the game?*

**A:** I'm sure there are quite a few, but looking for them might be risky.

- If you're on Android or Windows robot9706 has a **[modded version of the game](http://robot9706.github.io/FSSE/?s=undw)** you can download. It includes things like unlimited dwellers and the ability to destroy any rooms. For Windows only robot9706 also has an **[extended version](http://robot9706.github.io/FSSE/Outfits/alpha.html)** which allows you to implement custom outfit textures.

- Someone found **[this](http://faloutshelter.com/fallout-shelter-v1-1-mod/)** for Android which makes a lot of things unlimited. It appears to be trustworthy. It's an APK, so you'll have to uninstall the normal game then install the modded version from it. Don't forget to backup your vault(s) first, otherwise you'll lose them when uninstalling.

If anyone knows of anything else that is trustworthy I could include it here.

## 15.6

**Q:** *Is there anywhere I can find a dump of game data and IDs?*

**A:** robot9706 has once again done a great job and done so **[here](http://robot9706.github.io/FSSE/game_data.html)**. It includes dwellers, weapons, outfits, pets, and quests. You can even sort by any of the columns.