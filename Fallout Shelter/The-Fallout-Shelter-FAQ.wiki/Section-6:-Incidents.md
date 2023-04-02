## 6.1

**Q:** *How does combat work in the vault?*

**A:** There are only two things that affect your dweller's performance, and that's their health and weapon damage. Pets can also affect combat if it's a relevant effect (+X damage, +X% damage resistance, etc.). Weapon damage is what you see, and health is explained in **[4.1](https://github.com/therabidsquirel/The-Fallout-Shelter-FAQ/wiki/Section-4:-Dweller-Happiness-and-Health#41)**. SPECIALs do not affect combat (see **[2.6](https://github.com/therabidsquirel/The-Fallout-Shelter-FAQ/wiki/Section-2:-SPECIAL#26)**), and outfits do not act as armor in any shape or form.

## 6.2

**Q:** *What determines how strong incidents are?*

**A:** Let me classify two kinds of incidents, internal (fires, radroaches, mole rats, radscorpions) and external (raiders, feral ghouls, deathclaws). Internal incidents appear inside your vault while external attack from outside.

Both internal and external incidents get significantly stronger as your average dweller level increases (viewable in the stats page). The increase in difficulty is significant enough that in a new game I would strongly recommend avoiding leveling up as many dwellers as possible. The only real unavoidable level ups would be during exploration, which you definitely should still do. In a new game your dwellers will have very low endurance, so the tiny amount of health they get from level ups will not outscale how much tougher the level ups will make incidents. It's much safer to only start leveling all your dwellers once you have them properly endurance trained (see **[4.1](https://github.com/therabidsquirel/The-Fallout-Shelter-FAQ/wiki/Section-4:-Dweller-Happiness-and-Health#41)** on health).

Internal incidents also get tougher with the level and width of the room they're currently in. What room they spawned in doesn't matter, difficulty adjusts on a per room basis as they spread (or teleport around in the case of radscorpions). For a long time it was thought that room level and width were the only factors in internal incident difficulty, but it was eventually found that average dweller level not only matters too, but it matters far more than the other two. I have a **[post here](https://en.reddit.com/r/foshelter/comments/vilnpw/a_rough_analysis_on_incident_difficulty/)** where I do a rough breakdown on internal incidents, showing that average dweller level plays the biggest role by far in increasing difficulty, followed by room level, and then room width having the smallest effect. The increase from room width can mostly be countered by filling the room, and I would not recommend having something like 2 dwellers in a triple room if you can avoid it. Keeping your average dweller level as low as possible goes a long way to keeping internal incidents easy, but I also might recommend keeping rooms level 1, especially on survival. Keeping rooms level 1 is the strategy we recommended for years, so it is very viable to run a vault with level 1 rooms.

## 6.3

**Q:** *How do internal incidents spread?*

**A:** Incidents only spread when a room is empty, either because it was empty to begin with, you vacated everyone from it, or it killed everyone. After a short while in an empty room, they spread and the source room can no longer be affected from that incident. This means all incidents will eventually spread out and die, as they don't ever go through the same room twice. When an incident spreads from a room, basically it does so to all of its neighbouring rooms. This post **[here](https://en.reddit.com/r/foshelter/comments/4bnq6z/incident_propagation_explanation/)** (firaro) has all the specifics on what rooms are considered neighbouring, including edge cases and how you can manipulate that.

Radscorpions are the exception to this though. They appear randomly like the others, but rather than spreading out if uncontested, after a certain amount of time whether they're being fought or not they randomly teleport to another room. They don't spread out, but they can easily randomly land in empty rooms as they teleport around. Yes, it's supposed to be them burrowing around through your vault, but how they do it might as well be teleportation.

## 6.4

**Q:** *I've heard people mentioning you can mole rat proof your vault, how do you do that?*

**A:** Mole rats can appear in any room that is touching any amount of dirt, **except** if it's the dirt that is above the buildable area of the vault. The room itself has to be directly touching dirt, so having elevators in the way blocks it (as incidents can't appear in elevators). Here's an **[example screenshot](http://i.stack.imgur.com/jEdwR.jpg)** (codyman144) of what that might look like.

*However*, I wouldn't recommend mole rat proofing. You might find a lot of discussion about how great it is, but radscorpions weren't added into the game until much later. For a while mole rats were the hardest internal incident, and the only one that drained power. Back then it was great, but with unpreventable and much deadlier radscorpions, mole rat proofing is a lot of extra work (and sacrificing aesthetic) for not much payoff. It might even make things worse by making radscorpions more common, since mole rats can't happen, though I can only say "might" because I don't know the specifics of incident chances. Either way, if you can deal with radscorpions, you can very likely deal with mole rats.

## 6.5

**Q:** *My vault just got wiped by (insert incident here), what the hell?*

**A:** Refer to **[6.2](#62)** on incident strength. In most cases you probably leveled dwellers too much with low endurance (see **[4.1](https://github.com/therabidsquirel/The-Fallout-Shelter-FAQ/wiki/Section-4:-Dweller-Happiness-and-Health#41)** on health), and your weapon damage might also be too low for how high your average dweller level is. Avoiding as many level ups as possible keeps all incidents fairly weak. The tiny amount of health low endurance dwellers get from level ups will not outscale how much tougher the level ups will make incidents. In the case of internal incidents, having level 3 rooms also might be a problem, and in addition to keeping dweller level low you could also keep room level low until you have high endurance dwellers with better weapons.

You also might want to avoid harder incidents while you gather your strength. Deathclaws are by far the hardest external incident, and they can start attacking at 61 population in normal or 36 in survival. Similarly radscorpions are the hardest internal incident, and they can attack at 50 in normal or 36 in survival. A very common tactic is to sit just below those thresholds while you endurance train your dwellers and gather better weapons. See **[6.11](https://github.com/therabidsquirel/The-Fallout-Shelter-FAQ/wiki/Section-6:-Incidents#611)** for the thresholds of all incidents.

## 6.6

**Q:** *Why are my dwellers running around during an incident and not helping/shooting?*

**A:** It's a purely aesthetic animation and doesn't affect anything. During any kind of incident, the damage of both your dwellers and the incident is added up and applied as a gradual damage over time effect to the other side. Both sides have health (even fires, though weapons don't matter, just the number of dwellers), and incidents die if their health is depleted. Incident health and damage together make up the strength of the incident (see **[6.2](#62)**).

One exception to this animation though is during the very start of an incident, when dwellers all rush to their battle poses. An incident will start affecting ready dwellers in the room right away, but dwellers are only ready and start contributing (both dealing and taking damage) once they reach their "starting position". This happens in every room, but is most noticeable in nuclear reactors, which are deep rooms with a very large back area. If you pay attention you'll notice the dweller or two in the very back won't start losing health until they get to the very front, at which point the incident has been going on for at least several seconds. For this reason I would recommend not having a nuclear reactor as the first room(s) in your vault, as it means during deathclaw fights in particular if you've put your most powerful dwellers/weapons there, you won't get the most effectiveness out of all of them.

## 6.7

**Q:** *When do deathclaws start attacking?*

**A:** The earliest they've been seen definitively is 61 in normal and 36 in survival. It's possible they might appear at 60/35, but there's no hard proof so far. You're definitely safe at 59/34 and lower though. Check out **[6.11](#611)** for the limits for all incidents.

## 6.8

**Q:** *My pets run out of the room during an incident, do they still help?*

**A:** Pet bonuses still apply whether the pet is visually in the room or not. Objective Completion, Damage, Health, Damage Resist, and XP pets can all be used to help in some way in an incident.

## 6.9

**Q:** *Every time I tab back into my game I get an incident immediately, what's going on?*

**A:** There's an incident timer that ticks in the background of the game. As it ticks more the chance of an incident happening increases. Eventually it gets to a point where an incident is guaranteed. Tabbing out of the game (versus fully exiting and closing it) keeps the timer ticking, but as incidents can't happen while the game isn't running in the foreground, then it happens as soon as you go back to the game. Almost every UI (crafting, explorer, storage, VDSG, etc.) also prevents incidents from happening while not stopping the timer, so if you spend a lot of time in one you'll probably find an incident occurs as soon as you close the UI.

This timer can be exploited though. Failing a rush resets the timer, meaning you can strategically rush a small, low level room to failure (see **[6.2](#62)** on incident strength) to deal with an easy incident every once in a while, as opposed to dealing with something like deathclaws or an internal incident in a larger, higher level room. This is particularly useful in a survival vault where incidents are frequent and brutal.

## 6.10

**Q:** *When do radscorpions start attacking?*

**A:** They appear to occur earlier from rush failures than random attacks, but the earliest they've been seen (from rushes at least) is 50 in normal and 36 in survival. You should be safe as long as you're beneath that. Check out **[6.11](#611)** for the limits for all incidents.

## 6.11

**Q:** *When does each incident occur in both normal and survival vaults?*

**A:** There's an excellent post **[here](https://en.reddit.com/r/foshelter/comments/51dv4y/minimum_population_for_incidents/)** (ShardisWolfe) attempting to find all of the limits.

## 6.12

**Q:** *Does intelligence help for putting out fires faster?*

**A:** No, no SPECIAL stat does. In **[2.6](https://github.com/therabidsquirel/The-Fallout-Shelter-FAQ/wiki/Section-2:-SPECIAL#26)** I link to a post I made on testing whether strength increases damage, **[post here](https://en.reddit.com/r/foshelter/comments/8lyinz/testing_for_strength_and_damage/)**. As a result of that though I found that no SPECIAL directly helps with incidents in the vault. I had two groups, one with all SPECIAL at 1 and no outfit, and the other with all SPECIAL at 10 and the +7 strength outfit. I used a save editor to do this, and to give them all the same health despite having different endurance. I timed them against fires, radroaches, and mole rats, and none of the numbers suggest any significant difference.