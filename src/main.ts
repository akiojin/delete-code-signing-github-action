import * as core from '@actions/core'
import * as os from 'os'
import { Keychain } from '@akiojin/keychain'

const IsMacOS = os.platform() === 'darwin'

async function Run()
{
    try {
        const text = await Keychain.GetCodeSigning()

        // 2) DB1BD76E36121221A91216D4B69C767E998A4B69 "Apple Development: Akio Jinsenji (Y7S6CV6TA8)"
        const regex = /\s*\d\)\s(?<Hash>\w*)\s"[Apple|iPhone]*\s(?<Type>.*):\s(?<Publisher>.*)\s\((?<IssuerID>\w*)\)"/g

        const hashes = Array.from(text.matchAll(regex), match => match.groups!)
            .filter(match => !!match['Type'] && match['Type'] === core.getInput('type'))
            .filter(match => !!match['Publisher'] && match['Publisher'] === core.getInput('publisher'))
            .map(match => {
                console.log(match)
                match['Hash']
            })

        const promises = hashes
            .map(hash => Keychain.DeleteCodeSigning(hash!))

        await Promise.all(promises)
    } catch (ex: any) {
        core.setFailed(ex.message)
    }
}

if (!IsMacOS) {
	core.setFailed('Action requires macOS agent.')
} else {
    Run()
}
