# 🏴󠁧󠁢󠁳󠁣󠁴󠁿 Paisley Highland Games — 完整功能实现

一个功能完整的Highland Games(苏格兰高地运动会)活动管理系统,包含用户注册、团队管理、赛事报名、管理员审批、GDPR数据权利等完整流程。

## ✨ 核心功能

### 👤 用户管理
- ✅ 用户注册与登录(邮箱+密码)
- ✅ 邮箱验证准备
- ✅ 个人资料管理(全名、生日、电话、地址、紧急联系人、医疗信息)
- ✅ 密码加密存储(bcrypt)
- ✅ Session-based身份认证

### 👥 团队功能
- ✅ 创建团队(自动生成邀请码)
- ✅ 加入团队(输入邀请码)
- ✅ 团队成员管理
- ✅ 团队所有者权限
- ✅ 团队/个人参赛选择

### 🎯 赛事报名
- ✅ 浏览赛事列表
- ✅ 查看赛事详情和规则
- ✅ 选择参赛项目(8个传统项目)
- ✅ 个人或团队报名
- ✅ 多项同意确认(隐私政策、风险声明)
- ✅ 报名状态跟踪(Pending/Approved/Rejected)

### 🔐 管理员后台
- ✅ 管理员登录
- ✅ 报名审批工作流
- ✅ 通过/拒绝报名(拒绝需填写原因)
- ✅ 审批历史记录
- ✅ 待审批数量统计
- ✅ 数据请求处理
- ✅ 赛事和公告管理

### 🛡️ GDPR合规
- ✅ 数据导出请求(DSAR)
- ✅ 数据更正请求
- ✅ 账户删除请求
- ✅ 同意记录审计日志
- ✅ 数据请求历史
- ✅ 隐私政策同意

### 📧 通知系统
- ✅ 邮件验证通知
- ✅ 报名确认通知
- ✅ 审批结果通知
- ✅ 数据请求确认
- ✅ 预留SendGrid/AWS SES集成接口

---

## 🚀 快速开始

### 方式1: 使用批处理脚本(推荐)

**重置数据库:**
```cmd
reset-database.bat
```

**启动服务器:**
```cmd
quick-start.bat
```

### 方式2: 手动命令

**1. 安装依赖:**
```bash
npm install
```

**2. 重置数据库(如果需要):**
```bash
# 删除旧数据库
del prisma\dev.db
del prisma\dev.db-journal
rmdir /s /q prisma\migrations

# 运行迁移和种子
npm run setup
```

**3. 启动开发服务器:**
```bash
npm run dev
```

**4. 访问应用:**
打开浏览器访问: http://localhost:3000

---

## 👥 测试账号

### 普通用户
| 邮箱 | 密码 | 姓名 |
|------|------|------|
| test@example.com | password123 | Duncan MacDougall |
| john@example.com | password123 | John Campbell |

### 管理员
| 邮箱 | 密码 |
|------|------|
| admin@example.com | admin123 |

### 测试团队
- **团队名**: Highland Warriors
- **邀请码**: TEST1234

---

## 📋 完整用户流程

### 🎬 场景1: 新用户注册并报名赛事

1. **注册账号**
   - 访问首页 → 点击"Sign Up"
   - 输入邮箱和密码 → 创建账号

2. **完善资料**
   - 登录后访问"Profile"
   - 填写全名、生日、电话、地址等信息
   - 保存资料

3. **加入团队(可选)**
   - 访问"Teams"页面
   - 输入邀请码"TEST1234"加入测试团队
   - 或创建自己的团队

4. **报名赛事**
   - 访问"Events"查看赛事列表
   - 点击赛事进入详情页
   - 点击"Register"按钮
   - 填写报名表:
     - 确认全名
     - 选择参赛项目(如Caber Toss)
     - 选择团队(或个人参赛)
     - 勾选所有同意项
   - 提交报名

5. **查看报名状态**
   - 报名后状态显示为"Pending"
   - 等待管理员审批

### 🎬 场景2: 管理员审批流程

1. **登录管理后台**
   - 访问 `/admin`
   - 使用管理员账号登录

2. **查看待审批报名**
   - 查看"Pending Registrations"部分
   - 显示报名者信息、赛事、项目等

3. **审批报名**
   - **通过**: 点击"✓ Approve"按钮
   - **拒绝**: 
     - 展开"Reject with reason"
     - 输入拒绝原因(至少5个字符)
     - 点击"✗ Reject"

4. **审批结果**
   - 系统自动记录审批人和时间
   - 发送通知邮件给报名者
   - 报名状态更新

### 🎬 场景3: GDPR数据权利

1. **访问隐私页面**
   - 登录用户访问 `/privacy`

2. **导出个人数据**
   - 点击"Request Data Export"
   - 系统创建导出请求
   - 30天内收到数据

3. **更正数据**
   - 在"Correct Your Data"部分
   - 输入需要更正的内容
   - 提交更正请求

4. **删除账户**
   - 在"Delete Your Account"部分
   - 阅读警告信息
   - 输入"DELETE"确认
   - 提交删除请求并登出

5. **管理员处理**
   - 管理员在后台查看数据请求
   - 处理导出/更正/删除请求

### 🎬 场景4: 团队协作

1. **用户A创建团队**
   - 访问 `/teams`
   - 点击"Create Team"
   - 输入团队名称和描述
   - 创建成功获得邀请码(如"ABC12345")

2. **用户A邀请队友**
   - 复制邀请码
   - 通过任何方式分享给队友

3. **用户B加入团队**
   - 访问 `/teams`
   - 点击"Join Team"
   - 输入邀请码
   - 成功加入团队

4. **团队成员报名赛事**
   - 报名时选择该团队
   - 团队所有成员的报名会关联到同一团队

---

## 📁 项目结构

```
highland-games-starter/
├── app/
│   ├── routes/
│   │   ├── _index.jsx              # 首页(含引导)
│   │   ├── auth.jsx                # 注册/登录
│   │   ├── auth.logout.jsx         # 登出
│   │   ├── profile._index.jsx      # 用户资料
│   │   ├── teams._index.jsx        # 团队管理
│   │   ├── events._index.jsx       # 赛事列表
│   │   ├── events.$id.jsx          # 赛事详情
│   │   ├── events.$id.register.jsx # 报名表单
│   │   ├── admin._index.jsx        # 管理后台
│   │   ├── privacy._index.jsx      # GDPR数据权利
│   │   └── winners._index.jsx      # 获奖者
│   ├── utils/
│   │   ├── db.server.js            # 数据库连接(Prisma)
│   │   ├── session.server.js       # 会话管理
│   │   └── email.server.js         # 邮件服务
│   ├── styles/                      # CSS样式文件
│   └── root.jsx                     # 根布局(导航栏)
│
├── prisma/
│   ├── schema.prisma               # 数据库模型(10个表)
│   ├── seed.js                     # 种子数据
│   └── migrations/                 # 数据库迁移
│
├── reset-database.bat              # 数据库重置脚本
├── quick-start.bat                 # 快速启动脚本
└── IMPLEMENTATION_COMPLETE.md      # 完整实现说明
```

---

## 🗄️ 数据库模型

### 核心表 (10个)

1. **User** - 用户账号
   - 邮箱、密码、角色、邮箱验证状态

2. **UserProfile** - 用户资料
   - 全名、生日、电话、地址、紧急联系人、医疗信息

3. **Team** - 团队
   - 团队名、描述、邀请码、所有者

4. **TeamMember** - 团队成员关系
   - 团队ID、用户ID、角色(owner/member)

5. **Event** - 赛事
   - 名称、描述、日期、地点、报名开放期、名额限制

6. **Registration** - 报名记录
   - 用户、赛事、团队、项目、状态、审批信息

7. **Winner** - 获奖者
   - 赛事、项目、运动员、排名、年份

8. **Announcement** - 公告
   - 标题、内容、类型、发布日期

9. **ConsentLog** - 同意记录(审计)
   - 用户、同意类型、是否同意、IP地址、时间

10. **DataRequest** - 数据权利请求
    - 用户、请求类型(导出/更正/删除)、状态、原因

---

## 🔧 技术栈

- **框架**: Remix (全栈React框架)
- **前端**: React 18 + Remix
- **后端**: Node.js + Remix Server
- **数据库**: SQLite (开发) / PostgreSQL (生产)
- **ORM**: Prisma
- **身份认证**: Session-based (Cookie)
- **密码加密**: bcryptjs
- **样式**: CSS Modules
- **部署**: Docker支持

---

## 🔐 安全特性

- ✅ 密码bcrypt加密(10轮)
- ✅ Session-based认证(HttpOnly cookies)
- ✅ CSRF保护(Remix内置)
- ✅ SQL注入防护(Prisma)
- ✅ XSS防护(React自动转义)
- ✅ 同意记录审计日志

---

## 📊 数据关系图

```
User (用户)
├── UserProfile (1:1) ────┐
├── Team (1:N) ───────────┤
├── TeamMember (N:N) ─────┤
├── Registration (1:N) ───┼── 完整用户数据
├── ConsentLog (1:N) ─────┤
└── DataRequest (1:N) ────┘

Event (赛事)
├── Registration (1:N) ── 报名记录
├── Winner (1:N) ───────── 获奖者
└── Announcement (1:N) ─── 公告

Team (团队)
├── TeamMember (1:N) ───── 成员关系
└── Registration (1:N) ─── 团队报名
```

---

## 🌍 环境变量

创建 `.env` 文件:

```env
# 数据库连接
DATABASE_URL="file:./dev.db"

# Session密钥(生产环境请更改)
SESSION_SECRET="your-secret-key-here-change-in-production"

# 管理员账号
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="admin123"

# 应用URL
APP_URL="http://localhost:3000"
```

---

## 📜 可用命令

```bash
# 开发
npm run dev          # 启动开发服务器

# 数据库
npm run setup        # 迁移+种子数据
npx prisma studio    # 打开数据库可视化界面
npx prisma migrate dev --name xxx  # 创建新迁移

# 构建
npm run build        # 构建生产版本
npm start            # 运行生产版本

# 重置(Windows)
reset-database.bat   # 重置数据库
quick-start.bat      # 快速启动
```

---

## 🎯 流程图实现状态

所有4个流程图的功能已100%实现:

1. ✅ **总体泳道图** - 访客报名到审批发布的完整流程
2. ✅ **团队管理子流程** - 创建/加入团队的完整序列
3. ✅ **管理员审批子流程** - 配置赛事到审批报名
4. ✅ **GDPR数据权利子流程** - 导出/更正/删除数据

详细实现说明请查看: `IMPLEMENTATION_COMPLETE.md`

---

## 📞 支持

如有问题请查看:
- `IMPLEMENTATION_COMPLETE.md` - 完整功能说明
- `TECHNOLOGY_ANALYSIS.md` - 技术栈分析
- Prisma文档: https://www.prisma.io/docs
- Remix文档: https://remix.run/docs

---

## 📝 许可证

© 2025 Paisley Highland Games. All rights reserved.

---

## 🎉 开始使用

```bash
# 1. 重置数据库
reset-database.bat

# 2. 启动服务器
quick-start.bat

# 3. 打开浏览器
# http://localhost:3000

# 4. 使用测试账号登录
# test@example.com / password123
```

祝你使用愉快! 🏴󠁧󠁢󠁳󠁣󠁴󠁿
