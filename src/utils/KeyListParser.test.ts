import { describe, expect, test } from "vitest";
import { parseKeyList } from "./KeyListParser";
import { PrivateKey, PublicKey } from "../components/Main/NcryptorApp";
import { KeyTypes } from "../data/KeyTypes";

const PRIVATE_KEYS_OUTPUT = `
sec:u:4096:1:F5D75BE49C0E7D6F:1703455029:::u:::scESC:::+:::23::0:
fpr:::::::::F626C1EDA74F94D9BBBDCA51F5D75BE49C0E7D6F:
grp:::::::::93576DF60B1232EAE2D9EE60E8CAAFFC872F1C42:
uid:u::::1703455029::7D01A971F50FBE583C0347CAECF5C7CBF79F94E1::Test Identity <testidentity@aol.net>::::::::::0:
ssb:u:4096:1:EC8E3397265E005E:1703455029::::::e:::+:::23:
fpr:::::::::19BD7AD983C4A7F4E4ED72C8EC8E3397265E005E:
grp:::::::::7923884E41F7890DAF24D93167412F9AD5AAD649:
sec:u:255:22:FD848885A5F1A197:1703455309:3280255309::u:::cESCA:::+::ed25519:::0:
fpr:::::::::5AB76639D1B570BEEFCBBD1CFD848885A5F1A197:
grp:::::::::2AF786030747891E30A5FE5C6308C4AB1A0B2C84:
uid:u::::1703455309::DFEC797146BFC504C0AC1D887ACE1C459A128622::D'Jasper Probincrux III (D'Jasper Probincrux III) <djasperprobincruxiii@djasperprobincruxiii.com>::::::::::0:
ssb:u:255:22:14AFE0E61513934B:1703455364:1798063364:::::s:::+::ed25519::
fpr:::::::::03BC63ED34096AA5D88B393514AFE0E61513934B:
grp:::::::::C9D909FC5E520EFB90C17C0E69297EABF05EF23D:
ssb:u:4096:1:1491D9F95FC22D15:1703455398:1798063398:::::e:::+:::23:
fpr:::::::::77ACDBA17B5F54A4C400239F1491D9F95FC22D15:
grp:::::::::C57FEDC8E0D3ED337769396CC1AEF1CCB950FEBF:
ssb:u:255:22:A0E9186458636922:1703455444:1798063444:::::a:::+::ed25519::
fpr:::::::::F69CBC21C56814F3E803518BA0E9186458636922:
grp:::::::::46AD29634D394D3EBA7D557149FE3B7D0CE7B9BC:
`;

const PUBLIC_KEYS_OUTPUT = `
pub:-:4096:1:DBB802B258ACD84F:1421590671:1704360941::-:::cSC::::::23::0:
fpr:::::::::A490D0F4D311A4153E2BB7CADBB802B258ACD84F:
uid:-::::1668072972::56CE2B43AA9493872A802884F36253ED9A504FF1::Tails developers <tails@boum.org>::::::::::0:
uid:-::::1668072941::0D4C42B79EBEDAF02E8F2FFF6CA5C5D6525200B2::Tails developers (offline long-term identity key) <tails@boum.org>::::::::::0:
sub:-:4096:1:D21DAD38AF281C0B:1503935638:1704367147:::::s::::::23:
fpr:::::::::05469FB85EAD6589B43D41D3D21DAD38AF281C0B:
sub:-:255:22:90B2B4BD7AED235F:1503930294:1704367147:::::s:::::ed25519::
fpr:::::::::CD4D4351AFA6933F574A9AFB90B2B4BD7AED235F:
sub:-:4096:1:7BFBD2B902EE13D0:1634226680:1704361061:::::s::::::23:
fpr:::::::::753F901377A309F2731FA33F7BFBD2B902EE13D0:
sub:e:4096:1:3C83DCB52F699C56:1421595116:1515674976:::::s::::::23:
fpr:::::::::A5091F72C746BA6B163D1C183C83DCB52F699C56:
sub:e:4096:1:98FEC6BC752A3DB6:1421590835:1515674960:::::s::::::23:
fpr:::::::::BA2C222F44AC00ED9899389398FEC6BC752A3DB6:
sub:r:4096:1:AA9E014656987A65:1421590930:1452522130:::::s::::::23:
fpr:::::::::C3B6813CD95D79C212F5AA21AA9E014656987A65:
sub:e:4096:1:AF292B44A0EDAA41:1472561457:1515675057:::::s::::::23:
fpr:::::::::79192EE220449071F589AC00AF292B44A0EDAA41:
sub:r:4096:1:3020A7A9C2B72733:1503935663:1602075278:::::s::::::23:
fpr:::::::::2FAF9BA0D65BB371F0BC2D463020A7A9C2B72733:
sub:r:4096:1:A8B0F4E45B1B50E2:1535637307:1642610186:::::s::::::23:
fpr:::::::::FE029CB4AAD4788E1D7828E8A8B0F4E45B1B50E2:
pub:-:4096:1:70F4F03116525F43:1345714920:1728632049::-:::scESC::::::23::0:
fpr:::::::::D113CB6D5131D34BA5F0FE9E70F4F03116525F43:
uid:-::::1665560049::A8758F234F0FB0602F207E2DB08266621680432B::Tails system administrators <tails-sysadmins@boum.org>::::::::::0:
uid:-::::1665560049::DA6CF2C472639E55AB464CB7E1F76416FE91069C::Tails system administrators (schleuder list) <tails-sysadmins-request@boum.org>::::::::::0:
uid:-::::1665560049::0C10D3FD3B1C9750C5C547D5AE15A6B355950802::Tails system administrators (schleuder list) <tails-sysadmins-owner@boum.org>::::::::::0:
sub:-:4096:1:58BA940CCA0A30B4:1345714920:1728632093:::::e::::::23:
fpr:::::::::373DA2F425C9D097B95ADAD458BA940CCA0A30B4:
pub:-:4096:1:0190E73C38F13068:1601634096:::-:::scESC::::::23::0:
fpr:::::::::6AA64D2B7D77AD466667E7BD0190E73C38F13068:
uid:-::::1601634101::A60F6AEAD0C318A2D2500BC102D23A90EAFE695B::tails-weblate@boum.org <tails-weblate@boum.org>::::::::::0:
uid:-::::1601634101::BD660B4D5B3800D7D43CA82DE30BA17CA13B6AE9::tails-weblate@boum.org <tails-weblate-request@boum.org>::::::::::0:
uid:-::::1601634101::BF6BF64E301828C1C0A96AB064550B18E00EA01A::tails-weblate@boum.org <tails-weblate-owner@boum.org>::::::::::0:
sub:-:4096:1:2F7EC378C628BE30:1601634096::::::e::::::23:
fpr:::::::::731BDF8D8CF97B756B8F80482F7EC378C628BE30:
pub:u:255:22:8F4EB6D93E6CDDAA:1696293484:3903813484::u:::cESCA:::::ed25519:::0:
fpr:::::::::B9E637BC9760345CD05238938F4EB6D93E6CDDAA:
uid:u::::1696293484::743D18B30B994888018642B8A5DD0A3AA49BAD91::John Torsten (johntorsten.com) <john.torsten.mailbox@protonmail.com>::::::::::0:
sub:u:255:22:3CE14F9B42D49DB1:1696293589:1790901589:::::s:::::ed25519::
fpr:::::::::DB9BADC82B503BF93A8EB0E93CE14F9B42D49DB1:
sub:u:4096:1:213BB10555CA1D25:1696293654:1790901654:::::e::::::23:
fpr:::::::::32D4B2EB117512ACFAA33FCC213BB10555CA1D25:
sub:u:255:22:7049CF1F66302C04:1696293710:1790901710:::::a:::::ed25519::
fpr:::::::::BEF8E25D707874E022DC9C2A7049CF1F66302C04:
pub:u:4096:1:F5D75BE49C0E7D6F:1703455029:::u:::scESC::::::23::0:
fpr:::::::::F626C1EDA74F94D9BBBDCA51F5D75BE49C0E7D6F:
uid:u::::1703455029::7D01A971F50FBE583C0347CAECF5C7CBF79F94E1::Test Identity <testidentity@aol.net>::::::::::0:
sub:u:4096:1:EC8E3397265E005E:1703455029::::::e::::::23:
fpr:::::::::19BD7AD983C4A7F4E4ED72C8EC8E3397265E005E:
pub:u:255:22:FD848885A5F1A197:1703455309:3280255309::u:::cESCA:::::ed25519:::0:
fpr:::::::::5AB76639D1B570BEEFCBBD1CFD848885A5F1A197:
uid:u::::1703455309::DFEC797146BFC504C0AC1D887ACE1C459A128622::D'Jasper Probincrux III (D'Jasper Probincrux III) <djasperprobincruxiii@djasperprobincruxiii.com>::::::::::0:
sub:u:255:22:14AFE0E61513934B:1703455364:1798063364:::::s:::::ed25519::
fpr:::::::::03BC63ED34096AA5D88B393514AFE0E61513934B:
sub:u:4096:1:1491D9F95FC22D15:1703455398:1798063398:::::e::::::23:
fpr:::::::::77ACDBA17B5F54A4C400239F1491D9F95FC22D15:
sub:u:255:22:A0E9186458636922:1703455444:1798063444:::::a:::::ed25519::
fpr:::::::::F69CBC21C56814F3E803518BA0E9186458636922:
`;

describe("Handles valid gpg output", () => {
  test("Should parse correct amount of public keys", () => {
    const publicKeysResult = parseKeyList(PUBLIC_KEYS_OUTPUT).filter(
      (key: PrivateKey | PublicKey) => key.keyType === KeyTypes.pub,
    );
    expect(publicKeysResult.length).toBe(6);
  });

  test("Should parse correct amount of public subkeys", () => {
    const publicSubkeysResult = parseKeyList(PUBLIC_KEYS_OUTPUT).filter(
      (key: PrivateKey | PublicKey) => key.keyType === KeyTypes.sub,
    );
    expect(publicSubkeysResult.length).toBe(18);
  });

  test("Should parse correct amount of private keys", () => {
    const privateKeysResult = parseKeyList(PRIVATE_KEYS_OUTPUT).filter(
      (key: PrivateKey | PublicKey) => key.keyType === KeyTypes.sec,
    );
    expect(privateKeysResult.length).toBe(2);
  });

  test("Should parse correct amount of private subkeys", () => {
    const privateSubkeysResult = parseKeyList(PRIVATE_KEYS_OUTPUT).filter(
      (key: PrivateKey | PublicKey) => key.keyType === KeyTypes.ssb,
    );
    expect(privateSubkeysResult.length).toBe(4);
  });

  test("Should parse correct validities", () => {
    const expectedPublicKeyValidities: string[] = [
      "-",
      "-",
      "-",
      "-",
      "e",
      "e",
      "r",
      "e",
      "r",
      "r",
      "-",
      "-",
      "-",
      "-",
      "u",
      "u",
      "u",
      "u",
      "u",
      "u",
      "u",
      "u",
      "u",
      "u",
    ];
    const privateKeysResult = parseKeyList(PRIVATE_KEYS_OUTPUT);
    const publicKeysResult = parseKeyList(PUBLIC_KEYS_OUTPUT);
    privateKeysResult.forEach((privateKey) => {
      expect(privateKey.validity).toBe("u");
    });
    for (let i = 0; i < publicKeysResult.length; i++) {
      expect(publicKeysResult[i].validity).toBe(expectedPublicKeyValidities[i]);
    }
  });

  test("Subkeys should get parent's userIds", () => {
    const privateKeysResult = parseKeyList(PRIVATE_KEYS_OUTPUT);
    const publicKeysResult = parseKeyList(PUBLIC_KEYS_OUTPUT);
    let currentPrivateKey: PrivateKey;
    privateKeysResult.forEach(privateKey => {
      if (privateKey.keyType === KeyTypes.sec) {
        currentPrivateKey = privateKey;
        return;
      }
      expect(privateKey.parentKeyFingerprint).toBe(currentPrivateKey.fingerprint);
    });
    let currentPublicKey: any;
    publicKeysResult.forEach(publicKey => {
      if (publicKey.keyType === KeyTypes.pub) {
        currentPublicKey = publicKey;
        return;
      }
      expect(publicKey.parentKeyFingerprint).toBe(currentPublicKey.fingerprint);
    });
  });
});
