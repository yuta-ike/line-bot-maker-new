import Link from "next/link"
import React from "react"
import { FiEdit3, FiFlag, FiHeart, FiShare } from "react-icons/fi"

import SectionCard from "@/beta/view/component/SectionCard"

export type WorkDetailPageProps = {
  params: {
    workId: string
  }
}

const WorkDetailPage = ({ params: { workId } }: WorkDetailPageProps) => {
  return (
    <div className="bg-slate-50">
      <div className="relative w-full pt-8 pb-20 bg-white border-b border-slate-200">
        <div className="max-w-full px-8 mx-auto w-container">
          <div className="flex items-center text-2xl font-bold text-slate-600">
            <h1 className="mr-4">天気予報プログラム</h1>
            <div className="flex shrink-0 items-center space-x-2 rounded bg-orange-500 px-2 py-0.5 text-sm font-bold text-white">
              <div>公開中</div>
            </div>
            <div className="flex items-center ml-auto space-x-4">
              <Link
                href={`/work/${workId}/edit`}
                className="flex items-center space-x-2 rounded-lg bg-slate-700 px-12 py-3 text-sm font-bold text-white transition hover:bg-slate-600 hover:shadow-lg active:translate-y-0.5 active:shadow-none"
              >
                <FiEdit3 />
                <div>編集する</div>
              </Link>
            </div>
          </div>
          <div className="flex mt-6">
            <div className="mr-10 grow">
              <div className="p-4 text-sm border rounded-xl border-slate-200 bg-slate-50 text-slate-600">
                天気予報を教えてくれるプログラムです！ぜひ使ってみてください！
                <hr className="mt-4" />
                <h2 className="mt-4 text-sm font-bold text-slate-500">
                  クリエイター
                </h2>
                <div className="flex items-center mt-2 space-x-2">
                  {["Yuta"].map((name) => (
                    <button
                      key={name}
                      className="flex items-center p-1 pr-4 space-x-2 border border-transparent rounded-full hover:border-slate-200"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-400 via-orange-400 to-yellow-500 shadow-orange-200" />
                      <div>{name}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <dl className="w-[240px] shrink-0 rounded-xl border border-slate-200 p-2 text-sm text-slate-600">
              <div className="flex items-center justify-between p-2">
                <dt className="text-slate-500">作成日</dt>
                <dd>2022/12/3</dd>
              </div>
              <div className="flex items-center justify-between p-2">
                <dt className="text-slate-500">最終更新日</dt>
                <dd>2023/5/3</dd>
              </div>
              <div className="flex items-center justify-between p-2">
                <dt className="text-slate-500">使用ブロック数</dt>
                <dd>14</dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="absolute bottom-0 flex items-center px-1 py-1 space-x-4 -translate-x-1/2 translate-y-4 bg-white border rounded-full shadow-lg left-1/2 w-max border-slate-200">
          <button className="grid w-12 h-12 rounded-full place-items-center bg-slate-100 text-slate-500">
            <FiHeart size={18} />
          </button>
          <button className="grid w-12 h-12 rounded-full place-items-center bg-slate-100 text-slate-500">
            <FiShare size={18} />
          </button>
          <button className="grid w-12 h-12 rounded-full place-items-center bg-slate-100 text-slate-500">
            <FiFlag size={18} />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center max-w-full px-8 pb-8 mx-auto mt-10 w-container">
        <SectionCard>
          <h2 className="text-xl font-bold leading-none text-slate-600">
            統計情報
          </h2>
          <dl className="mt-6 w-[240px] shrink-0 rounded-xl border border-slate-200 p-2 text-sm text-slate-600">
            <div className="flex items-center justify-between p-2">
              <dt className="text-slate-500">使ってくれた人</dt>
              <dd>24人</dd>
            </div>
            <div className="flex items-center justify-between p-2">
              <dt className="text-slate-500">会話の数</dt>
              <dd>103回</dd>
            </div>
            <div className="flex items-center justify-between p-2">
              <dt className="text-slate-500">エラー率</dt>
              <dd>
                <div className="inline-block w-2 h-2 mr-2 bg-green-400 rounded-full" />
                0%
              </dd>
            </div>
          </dl>
        </SectionCard>
        <SectionCard className="mt-8">
          <h2 className="text-xl font-bold leading-none text-slate-600">
            使い方
          </h2>
          <p className="mt-4 text-slate-600">
            1. 天気予報を知りたい時は、「天気を教えて」と送ってください。
            <br />
            2. 次に、場所を聞かれるので、場所を答えてください。
            <br />
            3. すると、天気予報が表示されます。
          </p>
        </SectionCard>
        <SectionCard className="mt-8">
          <h2 className="text-xl font-bold leading-none text-slate-600">
            サンプルの会話
          </h2>
          <p className="mt-4 text-slate-600">
            1. 天気予報を知りたい時は、「天気を教えて」と送ってください。
            <br />
            2. 次に、場所を聞かれるので、場所を答えてください。
            <br />
            3. すると、天気予報が表示されます。
          </p>
        </SectionCard>
      </div>
    </div>
  )
}

export default WorkDetailPage
