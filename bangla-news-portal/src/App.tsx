import React, { useState } from "react";
import { newspapers } from "./data/newspapers";
import { categoryNews } from "./data/newsData";
import { Search, Globe, ChevronRight } from "lucide-react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("newspapers");

  const filteredNewspapers = newspapers.filter(
    (paper) =>
      paper.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (paper.enName &&
        paper.enName.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const tabs = [
    { id: "newspapers", label: "সব পত্রিকা ও টিভি" },
    { id: "politics", label: "রাজনীতি" },
    { id: "economics", label: "অর্থনীতি" },
    { id: "entertainment", label: "বিনোদন" },
    { id: "international", label: "আন্তর্জাতিক" },
    { id: "education", label: "শিক্ষা" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="pt-16 pb-8 px-4 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-slate-800/50 rounded-2xl mb-4 border border-slate-700/50 shadow-lg backdrop-blur-md">
            <Globe className="h-8 w-8 text-cyan-400" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
            সংবাদপত্র ও নিউজ পোর্টাল
          </h1>
        </header>

        <div className="max-w-7xl mx-auto px-4 w-full mb-10 flex flex-wrap justify-center gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-cyan-500 text-white shadow-[0_0_15px_rgb(6,182,212,0.5)]"
                  : "bg-slate-800/60 text-slate-400 hover:bg-slate-700 hover:text-slate-200 border border-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <main className="flex-grow max-w-7xl mx-auto px-4 w-full pb-20">
          {activeTab === "newspapers" && (
            <>
              <div className="max-w-2xl mx-auto mb-12 relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="পত্রিকা বা টিভি চ্যানেলের নাম বাংলা বা ইংরেজিতে লিখুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 text-lg bg-slate-900/60 backdrop-blur-xl border border-slate-700/60 rounded-full focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all text-white placeholder:text-slate-500"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {filteredNewspapers.map((paper) => (
                  <a
                    key={paper.id}
                    href={paper.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-4 bg-slate-900/40 backdrop-blur-sm rounded-3xl border border-slate-800 hover:border-cyan-500/40 hover:-translate-y-2 transition-all duration-300"
                  >
                    <div className="w-full h-16 bg-white rounded-2xl p-2 flex items-center justify-center mb-3">
                      <img
                        src={paper.logo}
                        alt={paper.name}
                        className="max-h-full object-contain"
                      />
                    </div>
                    <div className="flex items-center justify-between px-1">
                      <span className="text-sm font-semibold text-slate-300 group-hover:text-cyan-400 transition-colors truncate">
                        {paper.name}
                      </span>
                      <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-white shrink-0" />
                    </div>
                  </a>
                ))}
              </div>
            </>
          )}

          {activeTab !== "newspapers" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* @ts-ignore */}
              {categoryNews[activeTab]?.map((news) => (
                <div
                  key={news.id}
                  className="group bg-slate-900/50 rounded-3xl overflow-hidden border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(6,182,212,0.15)] flex flex-col"
                >
                  <div className="h-52 overflow-hidden relative">
                    <img
                      src={news.image}
                      alt="News"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-xl font-bold text-slate-200 mb-3 group-hover:text-cyan-400 transition-colors leading-tight">
                      {news.title}
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed border-l-2 border-cyan-500 pl-3 mb-4">
                      {news.highlight}
                    </p>
                    <button className="mt-auto text-cyan-400 text-sm font-semibold flex items-center gap-1 hover:text-cyan-300 w-max">
                      বিস্তারিত পড়ুন <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* ফুটার সেকশন */}
        <footer className="py-6 border-t border-slate-800/50 mt-auto backdrop-blur-sm bg-slate-950/80">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-slate-400 text-sm font-medium mb-2">
              © ২০২৬ | বাংলাদেশের সব সংবাদ এক ঠিকানায়
            </p>
            <p className="text-[12px] text-slate-500 tracking-wide font-medium">
              Developed by Kamal Hossan, Student of Netrakona University
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
