import { cleanSegmentText, stitchSegments } from "../../lib/academy/clean-transcript";

const raw = "welcome to the ascetics mastery show i'm welcome to the ascetics mastery show i'm welcome to the ascetics mastery show i'm dr tim pearce hi dr tim pearce hi dr tim pearce hi i'm miranda pierce and tonight we are i'm miranda pierce and tonight we are i'm miranda pierce and tonight we are talk tonight and today we are talking talk tonight and today we are talking talk tonight and today we are talking about doesn't matter what time it is about doesn't matter what time it is about doesn't matter what time it is";
console.log("=== CLEANED 1 ===");
console.log(cleanSegmentText(raw));

const raw2 = "a hypertonic infra medial orbicularis a hypertonic infra medial orbicularis a hypertonic infra medial orbicularis oculi muscle that basically means your oculi muscle that basically means your oculi muscle that basically means your eyes are slightly narrowing which is eyes are slightly narrowing which is eyes are slightly narrowing which is also associated with aggression";
console.log("\n=== CLEANED 2 ===");
console.log(cleanSegmentText(raw2));

// Stitch test: segment boundary overlap
const segA = cleanSegmentText("we have to respect the anatomy and this we have to respect the anatomy and this");
const segB = cleanSegmentText("we have to respect the anatomy and this is what happens to injectors there's a is what happens to injectors there's a is what happens to injectors there's a lot of places");
const stitched = stitchSegments([segA, segB]);
console.log("\n=== STITCH (overlap removed) ===");
console.log(stitched.text);
