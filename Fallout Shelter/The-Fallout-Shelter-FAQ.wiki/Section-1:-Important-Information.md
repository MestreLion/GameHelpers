## 1.1

**Q:** *Why aren't my explorers finding anything? **OR:** Should I change my device/computer time to speed things up in my vault?*

**A:** Do **not** mess with your device time. The game calculates everything when you load it up based on the current device time and the time recorded from when you exited last. If you move your device time forward the game will just think a lot of time has passed, but if you **ever** move your device time back (such as resetting it to the correct time after moving it forward), the game will think a negative amount of time has passed, and that **will** break things. Do **not** mess with your device time. Known side effects of messing with device time include:

- Explorers not finding anything.

- Room timers being broken in the way of taking hundreds of hours to finish instead of several minutes.

- Anything else in the game involving a timer potentially being broken (training dwellers, explorer time, etc.)

If you've done this already and are looking for a way to fix it, check out **[15.4](https://github.com/therabidsquirel/The-Fallout-Shelter-FAQ/wiki/Section-15:-Save-Files-and-Editing#154)**.

Note though that you have to open a vault while a negative amount of time has passed for it to break; if you move time forward then backward without opening a vault it won't know what happened. If you also "catch up" to however far forward you went that should resolve the issues as well. This is why travelling across time zones shouldn't break things (for long at least) since it's a short time difference.

## 1.2

**Q:** *I haven't logged in for weeks or more and my dweller(s) in the wasteland have all this good gear and are still alive. Are they superhuman?*

**A:** As said in **[1.1](#11)** the game generates everything when you load it up based on the current and last played times, and this includes wasteland encounters and loot drops. The game can sometimes have problems properly handling absences more than 24 days though. If you've been away for 24+ days, then it can sometimes generate encounters and loot drops only from around the current time and not from when they started exploring. This can result in tonnes of legendary (junk and recipes) and rare loot drops. They may have also been killed by the encounters generated out that far, so you may have to revive them. I've had absences of multiple months without issues on my vaults, so it only happens sometimes, and I'm not sure on a specific trigger. If it has happened to you and it will take an unreasonable amount of time to wait for them to return, check out **[15.3](https://github.com/therabidsquirel/The-Fallout-Shelter-FAQ/wiki/Section-15:-Save-Files-and-Editing#153)** on how to return them quickly.

- **[Example 1](https://en.reddit.com/r/foshelter/comments/3y2bkc/not_a_bug_nope_not_at_all_finally_able_to_play/)** (Murdock07)

- **[Example 2](https://en.reddit.com/r/foshelter/comments/3zuh2q/i_quit_playing_for_30days_and_my_max_out/)** (janhyua)

- **[Example 3](https://en.reddit.com/r/foshelter/comments/48yyfq/the_update_fixed_one_of_my_vaults_these_guys_wont/)** (tsocx)

- **[Example 4](https://en.reddit.com/r/foshelter/comments/49d3tt/after_3_months_this_dweller_finally_gets_to/)** (rjrsa)

- **[Example 5](https://en.reddit.com/r/foshelter/comments/49mpcj/so_i_came_back_after_two_months_only_to_find_this/)** (Rinneeeee)

- **[Example 6](https://en.reddit.com/r/foshelter/comments/4a4ky6/soon/)** (clutchhomerun)

- **[Example 7](https://en.reddit.com/r/foshelter/comments/4cvzs9/havent_played_in_a_while_got_like_7_dwellers_in/)** (GMan129)

- **[Example 8](https://en.reddit.com/r/foshelter/comments/4db2l5/i_stopped_playing_for_a_while_and_one_dweller_got/)** (MystJake)

- **[Example 9](https://en.reddit.com/r/foshelter/comments/4esazd/i_think_my_game_bugged_out/)** (Bluescope99)

## 1.3

**Q:** *Are there other good sources of information for this game?*

**A:** That depends on what you're looking for. The **[Fallout wiki](http://fallout.wikia.com/wiki/Fallout_Shelter)** is good for lists of things, like lists of weapons, outfits, rooms, cap costs, population requirements, etc. When it comes to more specific information though, like the effects of SPECIAL or how rooms work or whatever else, it sometimes has incorrect information. It's good for a quick number check on something, but don't assume that because it's a wiki that everything on it is correct.

## 1.4

**Q:** *How do I transfer my vault between platforms?*

**A:** The format of the saves is (mostly) the same between platforms, so all you have to do is transfer the save file itself. Android and iOS share the same version, having the anniversary update, while all the other platforms share the same version. There are plenty of methods of moving files between devices, so look those up if you don't know any for your device. The Vault#.sav.bkp files are backup files for the vault. I would strongly recommend manually creating backups though, info on that in **[15.1](https://github.com/therabidsquirel/The-Fallout-Shelter-FAQ/wiki/Section-15:-Save-Files-and-Editing#151)**. Here's where the saves are located:

- *Android:* Android/data/com.bethsoft.falloutshelter/files/Vault#.sav

    (you'll need a file explorer app to access it on your device, or just plug into a computer)

- *iOS:* User App Files/Fallout Shelter/Documents/Vault#.sav

    (see **[15.1](https://github.com/therabidsquirel/The-Fallout-Shelter-FAQ/wiki/Section-15:-Save-Files-and-Editing#151)** for how to perform file transfers)

- *Bethesda Launcher:* C:/Users/\<your username\>/Documents/My Games/Fallout Shelter/Vault#.sav

- *Steam:* C:/Users/\<your username\>/AppData/Local/Fallout Shelter/Vault#.sav

- *Windows 10 and Xbox One:* This one's more difficult. If you have the Play Anywhere version and are either on Windows 10 or can sync your Xbox with Windows 10, it's very deep in this path:

> C:/Users/\<your username\>/AppData/Local/Packages/BethesdaSoftworks.FalloutShelter_\<some string of numbers and letters\>/SystemAppData/wgs/\<very large hexadecimal number\>/\<very large hexadecimal number\>/

The parts in <angle brackets> will be different for each user. Here's an example of what the path might look like:

> C:/Users/Joe Smith/AppData/Local/Packages/BethesdaSoftworks.FalloutShelter_3275kfvn8vcwc/SystemAppData/wgs/0009000002967BFA_0000000000000000000000007FACC08D/21821535E3D44FCBBE5D833C6EBCFACF/

Once you're in that directory you should see three files. Two will have a size of about 1kb, while the third will be much larger (about 64kb for an early game). All you need to do is rename and swap out your vault (say "Vault1.sav") with this large file (which might be something like "BB81E4B38B64413D9D5C886B7F9B580B"). This should work both ways. Note the Play Anywhere file doesn't have an extension, so you'll have to remove or add the ".sav" extension for transferring to or from respectively.

- *PS4 and Nintendo Switch:* I know little about these platforms, so I don't know the specifics of how to view or access game data.

## 1.5

**Q:** *What are some good layout tips?*

**A:** A lot of layout is down to personal preference and what you want out of it, but there are some good general tips:

- Plan ahead for your elevators, and try to keep them tidy. On each floor you can fit 2 triple rooms, 1 double room, and 2 elevators. Making two elevator shafts going from top to bottom in your vault works very well then, as it makes building and reorganizing your vault considerably easier. Having elevators willy nilly all over the place makes for difficult vault planning and can make demolishing and moving rooms around very hard to do, unless you've got a very clear plan of what you want. If you go the elevator shaft route, decide where you want them as quickly as you can. Moving entire elevator shafts will probably require a lot of caps and time.

- Plan ahead for your living quarters. The game doesn't let you build or upgrade any living quarters if it would put your capacity over 200 population, and it also won't let you demolish any if it would put you over capacity. Explorers, questers, and dead dwellers still count, the only way get rid of dwellers is permanently by eviction or removing their dead body. So for example, one level 3 triple living quarters provides room for 40 population, meaning five puts you at max. If you then reach 200 population, but decide you want to move a living quarters, you can't build another first as you're at the max, but you can't demolish one either. You'd have to get rid of 40 of those 200 dwellers before you could demolish and rebuild a living quarters. A little bit of planning prevents something like this from happening, though you only really have to worry about it as you're getting closer to max population.

- Remember that most rooms are most efficient as a triple. This includes power and storage rooms. Power rooms used to be more efficient as a double, but that was fixed a very long time ago. The only rooms it doesn't include are medbays and science labs. For production both are most efficient as a double, and for stimpak and RadAway storage width (and level) doesn't matter. Medbays and science labs always provides storage for 10 stimpaks/RadAway per single room area, so a triple room and three single rooms both provide 30 storage for example. For this reason medbays and science labs are very good to use as the double rooms in your vault. Barbershops and the overseer's office have to be double while all three crafting rooms have to be triple; they are built as such and can't be changed. Rooms you don't use too much could also work well as doubles to save triples for more important rooms. Regardless, try to avoid single rooms unless you have good reason. Single rooms of any type are very inefficient. An exception to this is with objective grinding, in which having a level 1 single room makes rush spamming very effective (more in bullet 4 of **[11.2](https://github.com/therabidsquirel/The-Fallout-Shelter-FAQ/wiki/Section-11:-Objectives#112)**).

- How you want to deal with internal incidents in the late game is an important consideration. An important detail is that they can't spread through dirt, meaning you can do things like have rooms diagonal from each other to completely eliminate spreading (often called "checkerboarding" or "honeycombing"), or have dirt layers between sections of rooms to keep incidents contained to each section. Examples of this can be seen in the vaults in **[1.11](#111)**. If you have a less standard arrangement of rooms, **[6.3](https://github.com/therabidsquirel/The-Fallout-Shelter-FAQ/wiki/Section-6:-Incidents#63)** has all the details on how spreading works.

- If you really don't like mole rats, you could mole rat proof your vault. **[6.4](https://github.com/therabidsquirel/The-Fallout-Shelter-FAQ/wiki/Section-6:-Incidents#64)** covers how that works if you're interested. This was common early in the game's life, but then the 1.6 update added radscorpions that are definitely more annoying than mole rats and can't be prevented. If your vault can handle radscorpions it can very probably handle mole rats, and for this reason I can't recommend mole rat proofing.

- ShardisWolfe took the time to write out a **[very detailed and good comment](https://www.reddit.com/r/foshelter/comments/4kyne1/vault_defence/d3ivwhu)** on vault design, so feel free to give it a look as well.

All that reading's nice, but what would this actually look like in end game vaults? Check out **[1.10](#110)** for screenshots of my vaults with a long explanation of choices I've made, and check out **[1.11](#111)** for screenshots of other people's end game vaults.

## 1.6

**Q:** *Why are my dwellers dying really quickly during quests, exploration, or in the vault?*

**A:** This is a very common problem that comes from misunderstanding how health works in the game. It's a hidden mechanic that has barely any explanation (the only one being a brief loading screen tip), and so a lot of people end up screwing themselves over on it without even realizing. Check out **[4.1](https://github.com/therabidsquirel/The-Fallout-Shelter-FAQ/wiki/Section-4:-Dweller-Happiness-and-Health#41)**, it explains everything including what you can do to have dwellers with high health.

## 1.7

**Q:** *I haven't played in a while, what's been added and what have I missed?*

**A:** Chances are you've missed nothing, unless you haven't played in a very long time, as there hasn't been a significant content update since 2017. **[This site](https://www.ipa4fun.com/history/28790/)** has a list of every APK for seemingly every game version. Selecting any version lists what was added in that update, and then provides a further link to download an APK. While I can't verify how trustworthy any of the downloads are, this seems to be the best site currently for a full version history, as Bethesda took down their forums where there used to be a version history post for this game.

Also note that most of the 1.13 and 1.14 versions are not real updates, they're just the seasonal events being turned on and off, and this site lists them all even though those version numbers don't even show in-game.

## 1.8

**Q:** *My vault(s) disappeared from the vault list and I can't see or access them, am I screwed?*

**A:** This could mean your save is corrupted. Thanks to ShardisWolfe for this answer.

- First check to see if the .sav file(s) for your vault(s) is in the right place, see **[1.4](#14)** for the locations. There should also be a .sav.bkp file there, which is a backup file for your vault. If you don't see a .sav or a .sav.bkp then the vault is gone, so I hope you have a manual backup you can use.

- If the .sav is there, try moving it somewhere else for safety and then rename the .sav.bkp to just .sav.

- If you're on a PC, you can try opening the Bethesda launcher and clicking options then "Validate Files", or on Steam opening "Properties -> Local Files" and selecting "Verify integrity of game files". If it's a problem with the game and not your save this could fix it.

- If that also doesn't work you can try completely uninstalling then reinstalling the game (backup the saves and backups first though, as the folder they're in could get removed during uninstall depending on your platform).

- If none of that works you can check out robot9706's **[save editor](http://robot9706.github.io/FSSE/)**, it's very reliable and has some features for fixing corrupted saves.

- If there's *still* no luck, then you can always use a JSON converter and editor (**[15.2](https://github.com/therabidsquirel/The-Fallout-Shelter-FAQ/wiki/Section-15:-Save-Files-and-Editing#152)**) to dig around in your save to try to fix it. That or you can use one or a save editor to make a new vault and rebuild it to what you remember your vault was.

## 1.9

**Q:** *Are there any video guides out there?*

**A:** There's an awesome **[Vault Log playlist](https://www.youtube.com/playlist?list=PLdIAFHqxoraLE-T7yd201UnqU_oUlmb4e)** by YouTuber **[Pressing X](https://www.youtube.com/channel/UCTaQaXG_9XfNFoOKiGTeUGg)** that's very informative, in-depth and easy to follow. It's ongoing, so you can always check back to their playlist to see if new episodes are out.

## 1.10

**Q:** *What is your vault like?*

**A:** I've got two actually, a normal vault (404) started early September 2015, and a survival vault (777) started May 16, 2016. Here are some screenshots:

- **[Vault 404 (Normal)](http://i.imgur.com/9Fgemth.jpg)**

- **[Vault 777 (Survival)](http://i.imgur.com/2eJjWKM.jpg)**

Both screenshots are as of game version 1.9. I've made a few changes since, but they're small enough that I don't want to take the screenshots again. Here's my **[vault list](http://i.imgur.com/PmijnQL.jpg)** so you can see they are actually different vaults despite looking almost identical. I loved the layout I eventually settled on in my normal vault, so when I eventually started survival I stuck with it.

Both have the same operational population of 183 with extras being legendary dwellers I've gotten and am collecting (in the radio rooms), throwing out any duplicates. Don't think you need to have close to 200 dwellers to man an end game vault though, in fact you can easily do it with less than 100. A good chunk of those 183 I could evict without any problems. 18 are breeders (3 males and 15 females) that I used to use for pregnancy-related objective grinding, but I stopped getting those objectives a while ago and just haven't bothered to remove the dwellers even though they currently do nothing. I've got 36 crafters and could very easily cut 12. I'm also producing an abundance of resources and could cut back in all departments easily. Having as many dwellers as I do is absolutely excessive for my needs, but I consider having a near fully populated vault an end game goal for myself.

If you're curious about some stats, both vaults have an average level of 50 with SPECIAL averages of 10. Another end game goal for myself, having absolutely everyone max level and SPECIAL. In both vaults the legendary dwellers were leveled with 17E from the level I got them at (for the most part). For the remaining 183, in 404 122 are 15E while the other 61 are 17E, and in 777 all 183 are 17E. In 404 I'd done most of my leveling with E5 gear, and since it was before crafting I figured I'd never get the E7 outfit let alone multiples. When crafting was introduced I in no way wanted to re-level everyone, so I just did for explorers and vault guards. New dwellers after that were 17E leveled as I had the outfits anyway, though to be honest even E15 is overkill for the most part in a normal vault. Survival is a different story, and while E15 will be fine in most cases anyway, because of perma-death I've taken no chances and made everyone 17E (this is overly cautious of me, feel free to stick with 15E).

In both vaults my explorers use X-01 Mk VI Power Armor (mostly for the cool factor) and Dragon's Maws, while my questers use Heavy Merc Gear and Vengeance. Everyone in the vault uses +7 outfits for the stat of the room they're in, plus Dragon's Maws of course. All quests are done in both vaults too, leaving just dailies and weeklies.

You've also probably noticed my stockpiled Quantums and boxes. In both vaults I'm collecting Quantums so I haven't used a single one in either, while I've also started stockpiling lunchboxes and extra Mr. Handys too (both vaults have a Handy on all 25 floors and I don't want any exploring).

## 1.11

**Q:** *Is there somewhere I can see screenshots of other people's vaults?*

**A:** You're in luck, because I've decided to host a collection of vault pictures. If you want to feature yours (or want yours updated or removed from the list) then just message me. In brackets are the game version the screenshot is in and the game mode (normal or survival). Take a look at the diverse layouts of different players:

- **[GOD-WAS-A-MUFFIN](http://i.imgur.com/8k6A0s5.jpg)** (1.5, normal) "Built for objective grinding, while the clubs are completely for aesthetics (they house my legendary dwellers)."

- **[zoozooka](http://i.imgur.com/4ZFbGX2.jpg)** (1.6, normal) "Lower half is for storage and living quarters, where I dont have to deal with it every time an incident happens."

- **Daend, [Top](http://imgur.com/XhQhXcX), [Middle](http://imgur.com/55pjDid), [Bottom](http://imgur.com/uTcp5CX)** (1.6, normal) "Slowly training up all perfect SPECIAL +7E. Breeding with a +3 stats mom in that one room but I only keep legendarys as I might just keep my max pop around 168 (allows me to rearrange living quarters if I need). Weapon rooms making the new cheap legendary melee weapon or dragon maws. Might eventually put back in 3 or 4 full radio rooms for full happiness productivity. 2 wide living quarters are pretty much as efficient as 3 wide (13/room vs 13.3/room) so I use those as the filler 2 wides. I might focus on objectives afterwards because I don't really need lunchboxes though more pets would be nice."