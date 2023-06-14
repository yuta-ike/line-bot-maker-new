import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useMemo } from "react"

export const useQuerySync = <Value extends string>(
  key: string,
  values: Value[],
  defaultValue: Value,
) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const value = useMemo(() => {
    const param = searchParams.get(key)
    if (param == null || !(values as string[]).includes(param)) {
      return defaultValue
    } else {
      return param as Value
    }
  }, [defaultValue, key, searchParams, values])

  useEffect(() => {
    const param = searchParams.get(key)
    if (param == null || !(values as string[]).includes(param)) {
      const newSearchParams = new URLSearchParams(searchParams.toString())
      newSearchParams.delete(key)
      // @ts-ignore
      router.push(`${pathname}?${newSearchParams.toString()}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setValue = useCallback(
    (value: Value) => {
      const newSearchParams = new URLSearchParams(searchParams.toString())
      if (value === defaultValue) {
        newSearchParams.delete(key)
      } else {
        newSearchParams.set(key, value)
      }
      // @ts-ignore
      router.push(`${pathname}?${newSearchParams.toString()}`)
    },
    [defaultValue, key, pathname, router, searchParams],
  )

  return useMemo(() => [value, setValue] as const, [value, setValue])
}
