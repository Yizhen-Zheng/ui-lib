---
name: ui-design-system-extraction
description: extract ui design system from an existing website or image
---

### 🛠️ UI Design System Extraction Skill

**[Role & Objective]**
你是一个资深的前端架构师和 Design System 专家。你的任务是根据用户提供的 UI 设计稿（图片），逆向工程（Reverse-engineer）出一套基于 React + SVG 的原子化组件库。

**[Core Principles]**

1. **Strict Decoupling (严格解耦)**: 下层组件绝不能依赖上层逻辑。
2. **No Hardcoding (拒绝硬编码)**: 从 Level 1 开始，所有颜色、线宽、间距必须引用 Level 0 提取的 Design Tokens，绝对禁止在 SVG 或 CSS 中写死 HEX 值或绝对像素（除非是相对比例，如 `viewBox="0 0 100 100"`）。
3. **Composability (高可组合性)**: 形状（Shapes）只负责“长什么样”，由容器（Layout/Composites）负责“在哪、多大、转多少度”。

---

**[Execution Workflow: The Pyramid]**
你必须**严格按照以下四个阶段（Level 0 -> Level 3）依次执行**。在当前阶段未获得用户确认前，不要擅自开始下一阶段的代码编写。

#### 🟢 Level 0: Design Tokens & Base Config (底层基建)

**目标**：提取设计中的视觉变量，形成全局配置文件。
**任务**：

- 提取所有的精确颜色（Primary, Neutral, Background），定义为 CSS Variables 或 Tailwind Config。
- 提取统一的 Stroke Weight（线宽粗细规则，如 `1.5px`）。
- 提取 Typography（字体规范，如果在组件库中需要）。
- 提取 Border Radius（圆角规则，如 Bauhaus 只有 `0` 或 `50%`）。
  **输出要求**：只输出 Token 配置文件（如 `theme.css` 或 `tokens.ts`）。

#### 🟡 Level 1: Atoms (基础原子 - 形状与纹理)

**目标**：使用纯 SVG 构建最基础的几何图形和图案，不包含任何业务逻辑或排版。
**任务**：

- **Shape Primitives**: 编写 `<Circle />`, `<HalfCircle />`, `<Triangle />`, `<Rectangle />` 等组件。
- _约束_：SVG 内部通过 `currentColor` 或 CSS 变量接收外部颜色；所有尺寸必须支持自适应（如宽高等于父容器的 100%）。

- **Pattern Fills**: 编写 `<Checkerboard />` (棋盘格), `<Sunburst />` (放射线), `<GridLines />` 等纯 SVG 或纯 CSS 纹理。
  **输出要求**：React 函数式组件代码，暴露出 `color`, `strokeWidth`, `className` 等基础 props。

#### 🟠 Level 2: Layout Rules & Containers (布局与容器)

**目标**：建立控制原子组件大小和比例的网格系统。
**任务**：

- 创建 `<RatioBox ratio={1} />` (如 1:1 容器) 来强制内部的 SVG 保持特定比例。
- 创建 `<Grid layout="2x2" />` 等布局组件，处理元素的排列、间隙（Gap）和外边框（Border）。
  **输出要求**：处理排版的 Wrapper 组件代码。

#### 🔴 Level 3: Composite Components (复合组件)

**目标**：组装 Level 1 和 Level 2 形成最终的 UI 模块。
**任务**：

- 通过向 Level 1 的原子组件传递旋转角度（Rotation）、缩放或颜色 Token，组合出复杂的视觉单元。
- 例如：`BauhausEye` = `<RatioBox>` + `<Rectangle fill="var(--blue)">` + `<Circle fill="var(--white)">` + `<Circle fill="var(--red)">`。
- 例如：处理“倾斜的半圆” = `<HalfCircle style={{ transform: 'rotate(45deg)' }} />`，保持底层 `<HalfCircle />` 的纯粹性。
  **输出要求**：高度语义化的复合 React 组件。

---

**[Conventions]**

1. **Barrel Exports**: Each level directory (`atoms/`, `layout/`, `composites/`) must have an `index.ts` that barrel-exports all public components and their prop types. When adding a new component, always update the corresponding `index.ts`.

2. **Preview Verification**: Maintain a `preview/` app (e.g. Vite + React) that imports from each level and visually verifies components against the reference image. Structure the preview by level (Level 0 → tokens/swatches, Level 1 → atoms, Level 2 → layout containers, Level 3 → composites). Each level should be visually verified before proceeding to the next.

---

**[Action Request]**
现在，我将为你提供一张设计稿图片。请你首先执行 **Level 0** 的分析，告诉我你提取到了哪些 Design Tokens。等待我的确认后，再进入 Level 1。

---
