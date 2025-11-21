# 🚀 Highland Games - 快速启动说明

## ⚠️ 重要：PowerShell 被限制了！

**问题**: 你的电脑 PowerShell 不允许运行 npm 命令。

**解决方案**: 使用批处理脚本（双击运行）或使用命令提示符(CMD)。

---

## 📝 第一次使用（3个步骤）

### 步骤 1: 双击运行
```
first-time-setup.bat
```
这个脚本会：
- ✅ 检查 Node.js（已安装 v22.21.0）
- ✅ 安装所有依赖包（2-3分钟）
- ✅ 初始化数据库
- ✅ 创建测试账户

### 步骤 2: 启动服务器

双击运行：
```
quick-start.bat
```

### 步骤 3: 打开浏览器

访问：**http://localhost:3000**

---

## 🔐 测试账户

| 角色 | 邮箱 | 密码 |
|------|------|------|
| 普通用户 | duncan@highlands.com | password123 |
| 管理员 | admin@example.com | admin123 |
| 其他用户 | john@example.com | password123 |

**测试团队邀请码**: TEST1234

---

## 🛠️ 如果出现问题

### 问题 1: 数据库锁定
**双击运行**: `reset-database.bat`

### 问题 2: 构建错误
**双击运行**: `clean-build.bat`

### 问题 3: 端口被占用
**双击运行**: `reset-database.bat` (会关闭所有Node进程)

### 问题 4: npm 命令无法运行

**方法 A - 使用命令提示符(CMD):**
1. 按 `Win + R`
2. 输入: `cmd`
3. 回车
4. 运行命令:
```cmd
cd /d "e:\2025-2026西苏文件\Internet Technologies\期末CW02\highland-games-starter"
npm install
npm run dev
```

**方法 B - 临时启用PowerShell:**
1. 右键点击PowerShell，选择"以管理员身份运行"
2. 运行: `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`
3. 输入 `Y` 回车
4. 现在可以运行 npm 命令

---

## 📚 详细文档

完整设置指南（英文）: `SETUP_GUIDE.md`

里面包含：
- ✅ 所有问题的详细解决方案
- ✅ 软件安装说明
- ✅ 测试清单
- ✅ 常见错误修复
- ✅ 项目结构说明

---

## ✅ 需要的软件（已安装）

- ✅ **Node.js v22.21.0** - JavaScript 运行环境
- ✅ **npm** - 包管理器（随 Node.js 安装）
- ✅ **Git** - 版本控制

**不需要额外下载任何软件！**

所有依赖会在运行 `first-time-setup.bat` 时自动安装。

---

## 🎯 推荐操作流程

### 首次设置（只需一次）:
1. 双击 `first-time-setup.bat` ⏰ 3-5分钟
2. 等待完成

### 每次开发（每天）:
1. 双击 `quick-start.bat`
2. 打开浏览器 http://localhost:3000
3. 开始工作
4. 完成后按 Ctrl+C 停止服务器

### 遇到问题时:
1. 双击 `reset-database.bat`
2. 双击 `clean-build.bat`
3. 双击 `quick-start.bat`

---

## 🌐 在线访问（部署后）

GitHub仓库: https://github.com/Jiali-Ling/Group-J2-Highland-games-

部署文档: `RENDER_DEPLOYMENT.md`

---

## 📞 需要帮助？

1. 查看 `SETUP_GUIDE.md`（详细的英文指南）
2. 查看 `API_DOCUMENTATION.md`（API文档）
3. 查看 `README.md`（项目说明）

---

**最后更新**: 2025年11月21日
**状态**: ✅ 已修复所有已知问题
