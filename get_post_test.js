//GET profile.json

async function test() {
    const profile = await get_profile("profile.json");

    console.log(profile);

    //POST profile as profile4.json
    post_profile(profile, "profile4.json");
}

test();