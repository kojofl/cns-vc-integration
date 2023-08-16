import { IQLQuery } from "@nmshd/content"
import { expect } from "chai"
import { AbstractTest } from "../AbstractTest"

export class IQLQueryTest extends AbstractTest {
    public run(): void {
        describe("IQLQuery", function () {
            const validIqlQueries = ["#test", "LanguageCertificate && #language:de"]
            for (const q of validIqlQueries) {
                it(`can be created from valid query string '${q}'`, function () {
                    const serializable = IQLQuery.from({
                        queryString: q
                    })
                    expect(serializable).to.be.instanceOf(IQLQuery)
                })
            }

            const invalidIqlQueries = ["Döner", "$", "( foo "]
            for (const q of invalidIqlQueries) {
                it(`can't be created from invalid query string '${q}'`, function () {
                    expect(() => {
                        IQLQuery.from({
                            queryString: q
                        })
                    }).to.throw()
                })
            }
        })
    }
}
