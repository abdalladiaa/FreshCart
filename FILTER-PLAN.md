# URL Params Filtering Plan — Standard Approach (Next.js App Router + React Hook Form)

> خطة كاملة للفلترة باستخدام URL params — الطريقة اللي كل الناس بتستخدمها

---

## 1. Core Concept — Flowchart

```
User changes filter (checkbox/select/input)
            │
            ▼
   React Hook Form (watch)
            │
            ▼
   URLSearchParams builder
            │
            ▼
   router.push(`?${params}`)  ← updates URL
            │
            ▼
   Server Component re-renders
            │
            ▼
   Reads searchParams → fetches filtered data
            │
            ▼
   Passes new data to Client Component
            │
            ▼
   UI updates with new results
```

**Key rule:** الـ Form هو مصدر الحقيقة الوحيد (single source of truth). الـ URL مجرد انعكاس للـ form.

---

## 2. The Standard Architecture

```
app/(pages)/search/
  page.tsx                      ← Server: reads searchParams, fetches data
  search-client.tsx             ← Client: ONE useForm() for ALL filters
  components/
    search-input.tsx            ← search text field
    filter-sidebar.tsx          ← categories + brands checkboxes
    sort-select.tsx             ← sort dropdown
    active-filters.tsx          ← read-only pills (reads searchParams directly)
    products-grid.tsx           ← displays results
```

**Why this structure:**
- مفيش data fetching من الـ Client Component — دا غلط مشهور
- كل fetching يحصل ف الـ Server Component
- Client Component دوره بس: إدارة الـ form + تحديث URL
- الـ reset فعلاً بيحصل بشكل طبيعي (لما الـ URL يتغير، الـ server يعيد الـ render ويديلك props جديدة)

---

## 3. The Standard Code Pattern

### `page.tsx` (Server Component)

```tsx
import { getAllCategories } from "@/services/categories/getAllCategories/getAllCategories"
import { getAllBrands } from "@/services/brands/getAllBrands"
import { getAllProducts } from "@/services/poducts/getAllProducts/getAllProducts"
import SearchClient from "./search-client"

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams

  // Fetch in parallel
  const [categories, brands] = await Promise.all([
    getAllCategories(),
    getAllBrands(),
  ])

  // Build query string from searchParams (excluding "view")
  const query = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (key === "view") continue
    if (Array.isArray(value)) {
      value.forEach((v) => query.append(key, v))
    } else if (value) {
      query.append(key, value)
    }
  }

  const products = await getAllProducts(query.toString())

  return (
    <SearchClient
      categories={categories?.data}
      brands={brands?.data}
      products={products}
      view={params.view === "list" ? "list" : "grid"}
    />
  )
}
```

### `search-client.tsx` (Client Component — صاحب الـ form الوحيد)

```tsx
"use client"

import { useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { useRouter, useSearchParams } from "next/navigation"
import SearchInput from "./components/search-input"
import FilterSidebar from "./components/filter-sidebar"
import SortSelect from "./components/sort-select"
import ActiveFilters from "./components/active-filters"
import ProductsGrid from "./components/products-grid"

type Filters = {
  search: string
  category: string[]
  brand: string[]
  sort: string
}

export default function SearchClient({ categories, brands, products, view }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const { register, watch, reset } = useForm<Filters>({
    defaultValues: {
      search: searchParams.get("search") ?? "",
      category: searchParams.getAll("category"),
      brand: searchParams.getAll("brand"),
      sort: searchParams.get("sort") ?? "",
    },
  })

  // بس أول مرة يركب — يقرأ القيم من الـ URL
  // دا أحسن من useEffect + ref
  // لأن reset بيحصل مرة واحدة مش ف كل re-render

  const values = watch()
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const params = new URLSearchParams()

    if (values.search) params.set("search", values.search)
    if (values.sort) params.set("sort", values.sort)
    if (view === "list") params.set("view", "list")

    values.category?.forEach((id) => {
      if (id) params.append("category", id)
    })
    values.brand?.forEach((id) => {
      if (id) params.append("brand", id)
    })

    const qs = params.toString()
    router.push(qs ? `/search?${qs}` : "/search", { scroll: false })
  }, [values.search, values.category, values.brand, values.sort])

  return (
    <div>
      <SearchInput register={register} />
      <div className="flex gap-8">
        <FilterSidebar
          categories={categories}
          brands={brands}
          register={register}
        />
        <main className="flex-1">
          <SortSelect register={register} />
          <ActiveFilters />
          <ProductsGrid products={products} view={view} />
        </main>
      </div>
    </div>
  )
}
```

---

## 4. Component Responsibilities

| Component | Job | Reads URL? | Uses RHF? |
|-----------|-----|-----------|-----------|
| SearchInput | search text field | No (gets register prop) | Yes (register) |
| FilterSidebar | categories + brands checkboxes | No (gets register prop) | Yes (register) |
| SortSelect | sort dropdown | No (gets register prop) | Yes (register) |
| ActiveFilters | show active filter pills as badges | Yes (searchParams) | No |
| ProductsGrid | render product cards | No (gets products prop) | No |

**Each filter input gets `register` as a prop.** It doesn't know about URL or routing.

---

## 5. Array Params in URL — How It Works

URL: `?category=cat1&category=cat2&brand=br1`

| Operation | Code |
|-----------|------|
| Read | `searchParams.getAll("category")` → `["cat1", "cat2"]` |
| Write | `params.append("category", catId)` لكل عنصر |
| Remove all | `params.delete("category")` |

React Hook Form handle arrays automatically via `register("category")` on multiple checkboxes with the same name.

---

## 6. الاتجاهات اللي ممنوع تمشي فيها ❌

### ❌ Fetching داخل Client Component

```tsx
"use client"

// غلط — الـ fetching واجب الـ Server
useEffect(() => {
  fetch(`/api/products?${searchParams.toString()}`)
}, [searchParams])
```

**ليه؟** بيلغي ميزة Server Components، بيزود الـ bundle size، بيخلي البوت بتاع Google يشوف صفحة فاضية.

### ❌ useEffect يقرا من Form ويكتب ف Form (Loop)

```tsx
useEffect(() => {
  reset({ search: searchParams.get("search") ?? "" })
}, [searchParams]) // ← دا لوحدو كويس
```

الخطأ هو لما يكون عندك `useEffect` بي reset والـ reset دا يغير `watch` والتاني ي push URL. دا يعمل infinite loop.

**الحل:** `defaultValues` بس — ومتحطش `reset` فـ `useEffect`.

### ❌ استخدام Context أو Redux للـ filter state

الـ URL نفسه هو state management. متحتاجش حاجة زيادة.

### ❌ Debounce مع router.push

```tsx
// محتاج debounce للـ search عشان متدفعش push كل حرف
// بس دا مش معناه إن الـ architecture غلط — فقط أضف debounce للـ search تحديدًا
```

---

## 7. المشاكل اللي في الـ Code الموجود حالياً

| المشكلة | المكان | الحل |
|---------|--------|------|
| SearchHeader يستخدم `useState` بدل RHF | `SearchHeader.tsx` | استخدم `register("search")` من `useForm` |
| زر Search مش之间有 auto-submit | `SearchHeader.tsx` | استخدم `watch("search")` عشان الـ URL يتغير تلقائي |
| FilterContent عامل reset خارجي | `FilterContent.tsx` | `defaultValues` فقط + `useRef` لمنع أول مرة |
| السعر مش شغال أصلاً | `FilterContent.tsx` | ضيف `register("priceMin")` و `register("priceMax")` |
| view و sort مش جزء من form | `SearchToolbar.tsx` | ضيفهم `register("view")` و `register("sort")` لـ useForm |
| مفيش form واحد يجمع الكل | متفرق | Client Component واحد ب useForm واحد |
| ActiveFilters بيقرا searchParams | كويس — لكن | يقدر يستقبل props بدل ما يقرا searchParams لوحده |

---

## 8. تبسيط Phase 1: أقل تغيير بأعلى فائدة

لو عايز تبدأ بسرعة من غير ما تكتب كل حاجة من أول وجديد:

1. **حول `SearchComp` من Server لـ Client** — خلاص هو Client فعلاً
2. **اعمل `useForm` واحد ف `SearchComp`** — جمع كل الفلاتر فيه
3. **عدّل `FilterContent`** — يستقبل `register` بدل ما يعمل `useForm` خاص بيه
4. **حول `SearchHeader`** — يستخدم `register("search")` من الـ form بتاع `SearchComp`
5. **حول `SearchToolbar`** — يضيف `register("sort")` و `register("view")` لـ useForm
6. **شيل `reset` effect من `FilterContent`** — استخدم `defaultValues` + `useRef`

النتيجة: useForm واحد في `SearchComp` يتحكم في كل حاجة.

---

## 9. Summary — The Golden Rules

1. **Form واحد** → يتحكم في كل الـ filter inputs
2. **URL هو الـ source of truth** للـ server fetching
3. **Form هو الـ source of truth** للـ client UI
4. **defaultValues** من `useSearchParams()` — مرة واحدة أول ما الصفحة تتحمل
5. **useEffect + watch** → يبني URLSearchParams → `router.push`
6. **useRef flag** → يمنع useEffect من الشغل أول مرة
7. **Array params** → `params.getAll()` للقراءة، `params.append()` للكتابة
8. **مفيش `reset` فـ useEffect** — دا بيسبب loops
9. **مفيش fetch فـ Client Component** — دا بيقتل SEO
10. **كل حاجة type-safe** → TypeScript interface للـ form values
