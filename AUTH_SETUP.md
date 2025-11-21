# 用户注册登录系统安装指南

## 🎯 新功能说明

现在系统已经有完整的用户注册和登录功能！参赛者必须先注册账号或登录后才能报名参加活动。

## 📋 新增的页面

1. **注册页面**: `/auth/register`
   - 用户可以创建新账号
   - 需要提供：姓名、邮箱、密码

2. **登录页面**: `/auth/login`
   - 已注册用户登录
   - 需要：邮箱和密码

3. **登出功能**: `/auth/logout`
   - 点击导航栏的Logout按钮

## 🔧 安装步骤

### 1. 安装依赖包

在PowerShell中，以管理员身份运行：
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

然后安装bcryptjs（用于密码加密）：
```bash
npm install bcryptjs
```

**或者使用CMD（不是PowerShell）：**
```cmd
npm install bcryptjs
```

### 2. 重新生成数据库（包含测试用户）

```bash
npx prisma migrate reset --force
```

这会：
- 重置数据库
- 创建2个测试用户账号
- 创建示例活动数据

### 3. 启动服务器

使用之前的命令：
```bash
node ./node_modules/@remix-run/dev/dist/cli.js dev
```

## 👤 测试账号

系统会自动创建这些测试账号：

1. **测试用户1**
   - 邮箱: `test@example.com`
   - 密码: `password123`

2. **测试用户2**
   - 邮箱: `john@example.com`
   - 密码: `password123`

## 🎮 使用流程

### 新用户注册：
1. 访问 http://localhost:50482/
2. 点击导航栏的 "Register" 按钮
3. 填写注册表单（姓名、邮箱、密码）
4. 提交后自动登录并跳转到活动列表

### 已有用户登录：
1. 点击导航栏的 "Login" 按钮
2. 输入邮箱和密码
3. 登录成功后跳转到活动列表

### 报名参赛：
1. 必须先登录
2. 浏览活动列表，点击活动查看详情
3. 点击 "Register for Event" 按钮
4. 填写报名表单（会自动使用登录的邮箱）
5. 提交报名

### 退出登录：
1. 点击导航栏显示的邮箱旁边的 "Logout" 按钮

## 🔒 安全特性

- ✅ 密码使用bcrypt加密存储
- ✅ Session-based 认证（Cookie）
- ✅ 报名前必须登录
- ✅ 自动使用登录用户的邮箱
- ✅ 表单验证和错误提示
- ✅ 安全的密码长度要求（最少6字符）

## 🎨 页面效果

- 苏格兰高地背景图片
- 深色现代设计
- 平滑过渡动画
- 清晰的错误提示
- 友好的用户反馈

## 📁 新增文件列表

```
app/routes/
  ├── auth.login.jsx        # 登录页面
  ├── auth.register.jsx     # 注册页面
  └── auth.logout.jsx       # 登出处理

app/styles/
  └── auth.css              # 认证页面样式

app/utils/
  └── session.server.js     # 更新：添加用户会话函数
```

## 🔄 修改的文件

- `app/root.jsx` - 添加用户菜单和登录/注册链接
- `app/routes/events.$id.register.jsx` - 要求登录后才能报名
- `app/styles/global.css` - 添加导航栏用户菜单样式
- `prisma/seed.js` - 添加测试用户创建
- `package.json` - 添加bcryptjs依赖

## ⚠️ 故障排除

### 如果PowerShell报错：
使用CMD窗口替代PowerShell，或者用完整命令：
```bash
node ./node_modules/@remix-run/dev/dist/cli.js dev
```

### 如果无法安装bcryptjs：
1. 打开CMD（不是PowerShell）
2. 运行 `npm install bcryptjs`

### 如果登录后看不到用户信息：
- 清除浏览器Cookie
- 重新登录

## 🎯 完整测试流程

1. ✅ 访问主页
2. ✅ 点击"Register"创建新账号
3. ✅ 注册成功后自动登录
4. ✅ 导航栏显示用户邮箱
5. ✅ 浏览活动，点击详情
6. ✅ 点击"Register for Event"
7. ✅ 填写报名表单（自动显示登录邮箱）
8. ✅ 提交报名成功
9. ✅ 管理员登录 /admin 查看报名
10. ✅ 点击Logout退出登录

## 📞 需要帮助？

如果遇到问题，请告诉我具体的错误信息！
