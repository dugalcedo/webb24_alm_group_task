const { Accommodation, User } = require ("../test-setup.js")


describe("Accommodation Model", () => {

    it("should create an accommodation", async () => {

        const user = await User.create({
            username: "testuser",
            password: "Abcd1234.",
            email: "test@test.com",
            profilePic:"https://picsum.photos/seed/abc/200/200"
        })


        const acc = await Accommodation.create({
            adress: "Storälgsvägen 63",
            stad: "Köping",
            land: "Sverige",
            postnummer: "10101",
            hyra: 9000,
            rum: 3,
            userId: user.id
        })

        
        expect(acc).toBeDefined()
        expect(acc.adress).toBe("Storälgsvägen 63")
        expect(acc.stad).toBe("Köping")
        expect(acc.land).toBe("Sverige")
        expect(acc.postnummer).toBe("10101")
        expect(acc.hyra).toBe(9000)
        expect(acc.rum).toBe(3)
    })

    it("user should have an accommodation now", async () => {

        const user = await User.findOne({ where: { username: 'testuser' } })
        const accs = await Accommodation.findAll({ where: { userId: user.id }})
        
        expect(accs.length).toBeGreaterThan(0)
    })

    it("accommodations should automatically be destroyed (via CASCADE) when the user is destroyed", async () => {

        const user = await User.findOne({ where: { username: 'testuser' }})

        await user.destroy()

        const accs = await Accommodation.findAll({ where: { userId: user.id }})

        expect(accs.length).toBe(0)

    })

})