import FilterContent from "../FilterContent"

interface FilterSidebarProps {
  categories: any[]
  brands: any[]
  register: any
  setValue: any
  watch: any
}

export default function FilterSidebar({
  categories,
  brands,
  register,
  setValue,
  watch,
}: FilterSidebarProps) {
  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24 shadow-sm">
        <FilterContent
          categories={categories}
          brands={brands}
          register={register}
          setValue={setValue}
          watch={watch}
        />
      </div>
    </aside>
  )
}
