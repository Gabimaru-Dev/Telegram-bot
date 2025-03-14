require('./config')
//=================================================//
module.exports = Ǥαвιмαяʋ = handler = async (Ǥαвιмαяʋ, m, chatUpdate, store) => {
	try {
	
		const { smsg, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, format, parseMention, getRandom, getGroupAdmins } = require('./wabotDirs/lib/myfunc.js');
		const { toAudio, toPTT, toVideo, ffmpeg, addExifAvatar } = require('./wabotDirs/lib/converter');
		const { TelegraPh, UploadFileUgu, webp2mp4File, floNime } = require('./wabotDirs/lib/uploader');
    //=================================================//
const body = (
    m.mtype === "conversation" ? m.message.conversation :
    m.mtype === "imageMessage" ? m.message.imageMessage.caption :
    m.mtype === "videoMessage" ? m.message.videoMessage.caption :
    m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text :
    m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId :
    m.mtype === "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
    m.mtype === "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId :
    m.mtype === "interactiveResponseMessage" ? JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id :
    m.mtype === "templateButtonReplyMessage" ? m.msg.selectedId :
    m.mtype === "messageContextInfo" ? m.message.buttonsResponseMessage?.selectedButtonId || 
    m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text : ""
);

const budy = (typeof m.text === 'string' ? m.text : '');
        
var textmessage = (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || budy) : ""
//==============================<==========\\
const prefix = /^[°zZ#$@+,.?=''():√%!¢£¥€π¤ΠΦ&><™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°zZ#$@+,.?=''():√%¢£¥€π¤ΠΦ&><!™©®Δ^βα¦|/\\©^]/gi) : '.'
const isCmd = body.startsWith(prefix)
const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() 
const cmd = prefix + command
		const args = budy.trim().split(/ +/).slice(1);
		const q = text = args.join(' ')

		// Individual
		const botNumber = Ǥαвιмαяʋ.user.id.split(':')[0];
		const pushname = m.pushName || "No Name";
     const from = m.key.remoteJid
          	const rizzUser = JSON.parse(fs.readFileSync("./wabotDirs/database/owner.json"))
		const senderNumber = m.sender.split('@')[0];	
		const itsMe = m.sender == botNumber;
		const isOwner = [botNumber, ...rizzUser]
			.map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
			.includes(m.sender);
			
		if (!Ǥαвιмαяʋ.public) {
			if (!m.fromMe && !isOwner) return;
		};

		// Group
		const isGroup = m.chat.endsWith('@g.us');
		const groupMetadata = isGroup ? await Ǥαвιмαяʋ.groupMetadata(m.chat).catch(e => {}) : '';
		const groupName = isGroup ? groupMetadata.subject : '';
		const groupMembers = isGroup ? groupMetadata.participants : '';
		const groupAdmins = isGroup ? await getGroupAdmins(groupMembers) : '';
		const isBotAdmin = isGroup ? groupAdmins.includes(botNumber + '@s.whatsapp.net') : false;
		const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
		const isAdmins = isGroup ? groupAdmins.includes(m.sender) : false;
		const groupOwner = isGroup ? groupMetadata.owner : '';
		const isGroupOwner = isGroup ? (groupOwner ? groupOwner : groupAdmins).includes(m.sender) : false;

		//msg
		const isMedia = (m.type === 'imageMessage' || m.type === 'videoMessage')
		const fatkuns = (m.quoted || m)
		const quoted = (fatkuns.mtype == "buttonsMessage") ? fatkuns[Object.keys(fatkuns)[1]] : (fatkuns.mtype == "templateMessage") ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]] : (fatkuns.mtype == "product") ? fatkuns[Object.keys(fatkuns)[0]] : m.quoted ? m.quoted : m
		const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)
const thumbb = [
"https://files.catbox.moe/6fma8x.jpg",
// IMG link
"https://files.catbox.moe/37d3n2.jpg",
// IMG link
"https://files.catbox.moe/biskl6.jpg",
// IMG link
"https://l.top4top.io/p_3311ajro00.jpg",
// IMG link
"https://a.top4top.io/p_3311cjhpk1.jpg",
// IMG link
"https://d.top4top.io/p_3311rgpeu4.jpg",
// IMG link
"https://b.top4top.io/p_33114t79r2.jpg",
// IMG link
"https://c.top4top.io/p_3311j39t63.jpeg"
]
const pic = [
"https://f.top4top.io/p_33098keo50.jpeg",
// IMG Link
"https://files.catbox.moe/1pk2tm.jpeg",
// IMG Link 
"https://c.top4top.io/p_33099p3fs0.jpg",
// IMG Link
"https://a.top4top.io/p_3309frbaa0.jpg",
// IMG Link
"https://b.top4top.io/p_3310l879p0.jpg",
// IMG link
"https://h.top4top.io/p_3310mamuy0.jpg",
// IMG Link
"https://a.top4top.io/p_3310v9dk36.jpg",
// IMG Link
"https://b.top4top.io/p_33102tw2x3.jpg"
]
const random = pic[Math.floor(Math.random() * pic.length)]
const lol = thumbb[Math.floor(Math.random() * thumbb.length)]
const Tol = ["https://files.catbox.moe/rv7j3e.mp3"]
const ytt = Tol[Math.floor(Math.random() * Tol.length)]
		const qmsg = (quoted.msg || quoted)
		const mime = qmsg.mimetype || "";
		const moon = fs.readFileSync('./wabotDirs/media/wabot.jpg')

		//time
		const time = moment().tz("Africa/Lagos").format("HH:mm:ss");
		let ucapanWaktu;
		if (time >= "19:00:00" && time < "23:59:00") {
			ucapanWaktu = "good night 🌌";
		} else if (time >= "15:00:00" && time < "19:00:00") {
			ucapanWaktu = "happy afternoon 🌇";
		} else if (time >= "11:00:00" && time < "15:00:00") {
			ucapanWaktu = "it's noon 🏞️";
		} else if (time >= "06:00:00" && time < "11:00:00") {
			ucapanWaktu = "happy morning 🌁";
		} else {
			ucapanWaktu = "it's dawn 🌆";
		}
		const wib = moment(Date.now()).tz("Asia/Jakarta").locale("id").format("HH:mm:ss z");
		const wita = moment(Date.now()).tz("Asia/Makassar").locale("id").format("HH:mm:ss z");
		const wit = moment(Date.now()).tz("Asia/Jayapura").locale("id").format("HH:mm:ss z");
		const salam = moment(Date.now()).tz("Asia/Jakarta").locale("id").format("a");
		let d = new Date();
		let gmt = new Date(0).getTime() - new Date("1 January 2024").getTime();
		let weton = ["The Pahing", "Pound", "Wage", "Kliwon", "laws"][Math.floor(((d * 1) + gmt) / 84600000) % 5];
		let week = d.toLocaleDateString("id", { weekday: "long" });
		let calendar = d.toLocaleDateString("id", {
			day: "numeric",
			month: "long",
			year: "numeric"
		});
		const zets = {
			key: {
				fromMe: false,
				participant: "0@s.whatsapp.net",
				remoteJid: "status@broadcast"
			},
			message: {
				orderMessage: {
					orderId: "2029",
					thumbnail: pic,
					itemCount: `777`,
					status: "INQUIRY",
					surface: "CATALOG",
					message: `𝐊𝐢𝐧𝐠 𝐆𝐚𝐛𝐢𝐦𝐚𝐫𝐮`,
					token: "AR6xBKbXZn0Xwmu76Ksyd7rnxI+Rx87HfinVlW4lwXa6JA=="
				}
			},
			contextInfo: {
				mentionedJid: [m.sender],
				forwardingScore: 999,
				isForwarded: true
			}
		}
		const xreply = async (teks) => {
			await sleep(500)
			return Ǥαвιмαяʋ.sendMessage(m.chat, {
				contextInfo: {
					mentionedJid: [
						m.sender
					],
					externalAdReply: {
						showAdAttribution: false, //bebas
						renderLargerThumbnail: false, //bebas
						title: `𝐙𝐞𝐧 𝐗1`,
						body: `pαrαnσmαl єnd`,
						previewType: "VIDEO",
						thumbnail: moon,
						sourceUrl: "https://t.me/Gabimaru_Tech",
						mediaUrl: global.url
					}
				},
				text: teks
			}, {
				quoted: zets
			})
		}
async function premRep() {
var nln = [
`👋Hello There`,
`Checking Prem List`,
`Sorry\nYou aren't a premium user`
]
let { key } = await Ǥαвιмαяʋ.sendMessage(from, {text: 'Loading....'}, { quoted: ctt })

for (let i = 0; i < nln.length; i++) {
await Ǥαвιмαяʋ.sendMessage(from, {text: nln[i], edit: key });
}
}
		switch (command) {
			case "fullmenu": {
				let cap = `
Library : WS - baileys
Prefix : ( ${prefix} )
Status : ${Ǥαвιмαяʋ.public ? 'Public' : 'Self'}

*# main* :

> .ping
> .public
> .self
> .poll 
> .sticker
> .toimg
> .shorturl
> .tourl

*# owner*: 
\u0000> ( eval )
< ( eval-async )
$ ( cmd-exec )
				`
				Ǥαвιмαяʋ.sendMessage(m.chat, { 
					image: moon ,
					caption: cap,
					contextInfo: {
						mentionedJid: [
							m.sender
						],
						externalAdReply: {
							showAdAttribution: false,
							renderLargerThumbnail: false,
							title: `𝐃𝐚𝐯𝐢𝐝 𝐌𝐃`,
							body: `𝐅𝐨𝐫𝐞𝐯𝐞𝐫 𝐘𝐨𝐮𝐧𝐠`,
							previewType: "VIDEO",
							thumbnail: moon,
							sourceUrl: "https://t.me/Gabimaru_Tech",
							mediaUrl: global.url2
						}
					},
				}, { quoted: zets })
			}
			break
// © King Gabimaru 
case 'broadcast': case 'cfd': case 'share': case 'bcgc': {
if (!isOwner) {
    await premRep();
    return; // Exit the case after sending the "premRep" function
  }
if (!text) return xreply("𝖂𝖍𝖊𝖗𝖊 𝕴𝖘 𝖄𝖔𝖚𝖗 𝕿𝖊𝖝𝖙?")
let getGroups = await Ǥαвιмαяʋ.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
let anu = groups.map(v => v.id)
if (typemenu === "v1") {
xreply(`𝐁𝐫𝐨𝐚𝐝𝐂𝐚𝐬𝐭 𝐒𝐞𝐧𝐭 𝐓𝐨 ${anu.length} 𝐆𝐫𝐨𝐮𝐩 𝐂𝐡𝐚𝐭𝐬, 𝐂𝐚𝐬𝐞 𝐄𝐧𝐝𝐭𝐢𝐦𝐞: ${anu.length * 1.5} 𝐒𝐞𝐜𝐨𝐧𝐝𝐬`)
for (let i of anu) {
await sleep(1500)
Ǥαвιмαяʋ.sendMessage(i, {text: `${text}`}, {quoted:zets})
    }
    } else if (typemenu === "v2") {
m.reply(`ֆʊƈƈɛֆʄʊʟʟʏ ֆɛռ𐀀 ɮʀօǟɖƈǟֆ𐀀 𐀀օ ${anu.length} ɢʀօʊք`)
}
}
break
case "runtime":
case "uptime":
case "active": {
  if (!isOwner) {
    await premRep();
    return; // Exit the case after sending the "premRep" function
  }
xreply(`*Ƭнιƨ βσт Ħαƨ βɛɛи Яʋииιиɢ Ғσя ${runtime(process.uptime())}*\n> Ǥαвιмαяʋ`)
}
break
case 'tiktok': case 'tt': {
  if (!text) return reply(`Example: ${prefix + command} https://tiktok.com/Murbug-dev`);
  xreply("Please Wait...")
 const data = await fetchJson(`https://api.tiklydown.eu.org/api/download?url=${encodeURIComponent(text)}`)
  const vidnya = data.video.noWatermark
  const caption = `*[ TIKTOK DOWNLOADER ]*\n*Video Creator* _${data.author.name ?? ''} (@${data.author.unique_id ?? ''})_\n*Video Likes*: _${data.stats.likeCount ?? ''}_\n*Video Comments*: _${data.stats.commentCount ?? ''}_\n*Video Shares*: _${data.stats.shareCount ?? ''}_\n*No Of Plays*: _${data.stats.playCount ?? ''}_\n*No of Saves*: _${data.stats.saveCount ?? ''}_\n> ⏤͟͟͞͞ 𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝𝐞𝐝 𝐁𝐲 𝓩𝓮𝓷 𝓒𝓻𝓪𝓼𝓱
`;
 Ǥαвιмαяʋ.sendMessage(m.chat, { caption: caption, video: { url: vidnya } }, { quoted: zets })
}
break
case 'infogc': {
if (!isOwner) {
await premRep
}
let getGroups = await Ǥαвιмαяʋ.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map((entry) => entry[1])
let anu = groups.map((v) => v.id)
let teks = `⬣ *LIST OF GROUPS BELOW*\n\nTotal Group : ${anu.length} Group\n\n`
for (let x of anu) {
let metadata2 = await Ǥαвιмαяʋ.groupMetadata(x)
teks += `◉ No : ${metadata2.subject}\n◉ ID : ${metadata2.id}\n◉ Member : ${metadata2.participants.length}\n\n────────────────────────\n\n`
}
xreply(teks + `> ${author}.`)
}
break
case "ping":
                                     case "speed": {
               const startTime = new Date();
               const pingMsg = await Ǥαвιмαяʋ.sendMessage(m.chat, { text: '*sᵖᵉᵉᵈ* : 𝙍𝙐𝙉𝙉𝙄𝙉𝙂' });
             
              await Ǥαвιмαяʋ.relayMessage(m.chat, {
                   protocolMessage: {
                     key: pingMsg.key,
                     type: 14,
                     editedMessage: {
                       conversation: `*sᵖᵉᵉᵈ ➟* *${new Date() - startTime}* ᴍs `
                     }
                   }
                 }, {});
               }
            break	
            			case "public": {
				if (!isOwner) return
				xreply("succes change status to public")
				Ǥαвιмαяʋ.public = true
			}
			break

			case "self": {
				if (!isOwner) return
				xreply("succes change status to self")
				Ǥαвιмαяʋ.public = false
			}
			break

            case 's': 
            case 'sticker': 
            case 'stiker': {            
                if (/image/.test(mime)) {
                    let media = await quoted.download();
                    let encmedia = await Ǥαвιмαяʋ.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author });
                } else if (/video/.test(mime)) {
                    if ((quoted.msg || quoted).seconds > 11) {
                        return xreply(`Reply to the image with a caption ${prefix+command}\nIf the media you want to use as a sticker is a video, the maximum video duration is 1-9 seconds.`);
                    }
                    let media = await quoted.download();
                    let encmedia = await Ǥαвιмαяʋ.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author });
                } else {
                    xreply(`Reply image with caption ${prefix+command}\nVideo Duration 1-9 Seconds`);
                }
            }
            break

            case 'toimage': 
            case 'toimg': {
                if (!/webp/.test(mime)) {
                    return xreply(`Reply/Reply sticker with text: *${prefix + command}*`);
                }
                
                let media = await Ǥαвιмαяʋ.downloadAndSaveMediaMessage(qmsg);
                let ran = await getRandom('.png');
                
                exec(`ffmpeg -i ${media} ${ran}`, (err) => {
                    fs.unlinkSync(media);
                    if (err) return err;
            
                    let buffer = fs.readFileSync(ran);
                    Ǥαвιмαяʋ.sendMessage(m.chat, { image: buffer }, { quoted: ctt });
                    fs.unlinkSync(ran);
                });
            }
            break

            case "shortlink": 
            case "shorturl": {
                if (!text) return xreply(`Example: ${prefix + command} https://showmypenis`);
                if (!isUrl(text)) return xreply(`Example: ${prefix + command} https://showmypenis`);
            
                var res = await axios.get('https://tinyurl.com/api-create.php?url=' + encodeURIComponent(text));
                var link = `\n*Shortlink by TinyURL*\n${res.data.toString()}`;
            
                await xreply(link);
            }
            break

            case 'tourl': {
                if (!/video/.test(mime) && !/image/.test(mime)) return xreply(`Reply image with caption ${prefix+command}`);
                let pnis = await m.quoted ? m.quoted : m;
                let media = await pnis.download();
                let link = await TelegraPh(media);
                await sleep(1000);
                await xreply(`${link}`);
            }
            break


			default:
			if (body.startsWith("<")) {
                if (!isOwner) return;
                try {
                    const output = await eval(`(async () => ${q})()`);
                    await m.reply(`${typeof output === 'string' ? output : JSON.stringify(output, null, 4)}`);
                } catch (e) {
                    await m.reply(`Error: ${String(e)}`);
                }
            }
			if (budy.startsWith(">")) {
			if (!isOwner) return
				try {
					let evaled = await eval(q);
					if (typeof evaled !== "string") evaled = util.inspect(evaled);
					await m.reply(evaled);
				} catch (e) {
					await m.reply(`Error: ${String(e)}`);
				}
			}
			if (budy.startsWith("$")) {
			if (!isOwner) return
				exec(q,
					(err, stdout) => {
						if (err) return m.reply(err.toString());
						if (stdout) return m.reply(stdout.toString());
				})
				}
		}
		
	} catch (e) {
		console.log(e)
		Ǥαвιмαяʋ.sendMessage(Ǥαвιмαяʋ.user.id, { caption: e, image: { url: `https://k.top4top.io/p_3321imrlu0.jpg` } })
	}
}

let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
require('fs').unwatchFile(file)
console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
delete require.cache[file]
require(file)
})