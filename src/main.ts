import * as core from '@actions/core'
import * as os from 'os'
import { Keychain } from '@akiojin/keychain'

const IsMacOS = os.platform() === 'darwin'

async function Run()
{
  try {
    const promises = await Keychain.GetCodeSigning()

    if (!!core.getInput('type')) {
      promises.filter(sign => sign.Type === core.getInput('type'))
    }

    if (!!core.getInput('publisher')) {
      promises.filter(sign => sign.Publisher === core.getInput('publisher'))
    }

    if (!!core.getInput('issuer-id')) {
      promises.filter(sign => sign.IssuerID === core.getInput('issuer-id'))
    }

    await Promise.all(promises.map(sign => Keychain.DeleteCodeSigning(sign.Hash)))
  } catch (ex: any) {
    core.setFailed(ex.message)
  }
}

if (!IsMacOS) {
	core.setFailed('Action requires macOS agent.')
} else {
  Run()
}
