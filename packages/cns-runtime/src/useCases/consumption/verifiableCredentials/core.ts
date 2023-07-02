export function buildCredential(data: any, subjectDid: string, publicKey: string) {
    const now = new Date().toJSON();
    const issuanceDate = `${now.substring(0, now.length - 5)}Z`;
    const type = data["@type"];
    delete data["@type"];
    const credentialSubject: any = {};
    credentialSubject[`${type}`] = { ...data };
    credentialSubject["id"] = subjectDid;
    return {
        "@context": ["https://www.w3.org/2018/credentials/v1", "https://www.w3.org/2018/credentials/examples/v1", "https://enmeshed.eu/schema"],
        type: ["VerifiableCredential"],
        issuer: `did:key:${publicKey}`,
        issuanceDate,
        credentialSubject
    };
}
