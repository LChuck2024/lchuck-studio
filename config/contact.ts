/**
 * 主理人联系方式 - 统一配置
 * 修改此处后，chatbot 提示词与页脚会自动使用
 */

export const CONTACT = {
  /** 主理人微信号（用于添加好友） */
  weixin: 'Van_Dreams', // 请替换为你的真实微信号
  /** 主理人邮箱 */
  email: 'mjda0904@gmail.com',
  /** 闲鱼/其他平台（可选） */
  xianyu: '', // 如：闲鱼搜索「LChuck数据清洗」
};

/** 联系方式说明文案 - 用于 AI 提示词 */
export const CONTACT_INSTRUCTION = `
【重要 - 联系方式与对话限制】
1. 主理人联系方式：微信 ${CONTACT.weixin}（添加时请备注具体需求）；邮箱 ${CONTACT.email}
2. 本对话系统无法保存用户消息，主理人收不到你在聊天里留下的联系方式。
3. 当用户留下手机号/微信号/邮箱等时，必须明确告知：「本对话无法保存，请直接添加主理人微信 ${CONTACT.weixin} 或发邮件至 ${CONTACT.email} 联系，以免遗漏。」
4. 引导付费/咨询时，统一使用上述微信或邮箱联系方式。
`.trim();
