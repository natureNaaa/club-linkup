import React, { useState, useMemo } from 'react';
import { 
  Search, User, Sparkles, ChevronLeft, CheckCircle, 
  Clock, X, LayoutGrid, ArrowRight, MapPin, Users, Phone, ExternalLink, Globe,
  Share2, MessageCircle, Info
} from 'lucide-react';

// ----------------------------------------------------------------------
// 模拟社团数据 (Mock Data)
// ----------------------------------------------------------------------
const CLUBS_DATA = [
  {
    id: 1,
    name: "智航无人机社",
    category: "学术科技",
    tags: ["硬核技术", "航拍", "全国竞赛"],
    slogan: "上帝视角，俯瞰未来。",
    logo: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=120&h=120&fit=crop",
    cover: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&h=600&fit=crop",
    leader: "张远航",
    contact: "138-xxxx-5678",
    members: "120+",
    description: "智航无人机社是校内最具科技影响力的社团之一。我们专注于无人机组装、编程飞行以及高端航拍。社团多次代表学校参加全国大学生无人机大赛并蝉联一等奖。无论你是技术发烧友，还是视觉艺术家，这里都有你的天空。",
    activities: [
      { title: "周末试飞日", desc: "每周六下午在北操场进行集体试飞与调试。" },
      { title: "航拍艺术展", desc: "每学期末举办校园航拍摄影大赛。" }
    ],
    requirements: "对科技有热情，逻辑性强，能吃苦钻研。不要求有基础，我们提供从零开始的培训。",
    wechat: "ZhiHang_UAV"
  },
  {
    id: 2,
    name: "极光摄影社",
    category: "文化艺术",
    tags: ["人像", "胶片", "扫街"],
    slogan: "定格每一个不凡瞬间。",
    logo: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=120&h=120&fit=crop",
    sloganShort: "用镜头记录校园光影。"
  },
  {
    id: 3,
    name: "逐浪赛艇队",
    category: "体育竞技",
    tags: ["团队协作", "户外", "体能"],
    slogan: "同舟共济，勇往直前。",
    logo: "https://images.unsplash.com/photo-1527269534026-c86f4009eace?w=120&h=120&fit=crop",
    sloganShort: "在起伏的水面感受心跳。"
  },
  {
    id: 4,
    name: "绿影环保协会",
    category: "志愿公益",
    tags: ["低碳", "自然保护", "校园公益"],
    slogan: "让绿色成为校园底色。",
    logo: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=120&h=120&fit=crop",
    sloganShort: "为地球贡献一份青春力量。"
  },
  {
    id: 5,
    name: "灵动吉他社",
    category: "文化艺术",
    tags: ["弹唱", "摇滚", "原创"],
    slogan: "指尖流淌的音符，是我们的宣言。",
    logo: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=120&h=120&fit=crop",
    sloganShort: "琴弦震动，热爱发声。"
  },
  {
    id: 6,
    name: "星火支教团",
    category: "志愿公益",
    tags: ["教育帮扶", "暑期实践", "奉献"],
    slogan: "点燃微光，照亮梦想。",
    logo: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=120&h=120&fit=crop",
    sloganShort: "去山那边，看最美的风景。"
  },
  {
    id: 7,
    name: "弈林棋社",
    category: "兴趣爱好",
    tags: ["围棋", "博弈", "逻辑"],
    slogan: "方寸之间，气象万千。",
    logo: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=120&h=120&fit=crop",
    sloganShort: "静心思考，落子无悔。"
  },
  {
    id: 8,
    name: "巅峰攀岩社",
    category: "体育竞技",
    tags: ["极限运动", "勇气", "专注"],
    slogan: "向上攀登，永无止境。",
    logo: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=120&h=120&fit=crop",
    sloganShort: "挑战重力，超越自我。"
  },
  {
    id: 9,
    name: "幻象话剧社",
    category: "文化艺术",
    tags: ["表演", "编剧", "舞台"],
    slogan: "人生如戏，戏见人生。",
    logo: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=120&h=120&fit=crop",
    sloganShort: "在大幕开启前，找回真实的自己。"
  },
  {
    id: 10,
    name: "蓝图建筑建模社",
    category: "学术科技",
    tags: ["3D设计", "美学", "空间"],
    slogan: "构筑梦想的轮廓。",
    logo: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=120&h=120&fit=crop",
    sloganShort: "从线条到空间的艺术探索。"
  }
];

// ----------------------------------------------------------------------
// 测评题目数据 (Quiz Data)
// ----------------------------------------------------------------------
const QUIZ_QUESTIONS = [
  {
    title: "在闲暇的周末，你更倾向于哪种活动？",
    options: [
      { text: "钻研前沿科技与编程", tag: "科技控" },
      { text: "背起相机去捕捉光影", tag: "文艺青年" },
      { text: "在球场上挥洒汗水", tag: "运动达人" },
      { text: "参加公益支教服务", tag: "爱心大使" }
    ]
  },
  {
    title: "在团队合作中，你通常扮演什么角色？",
    options: [
      { text: "提供核心技术支持", tag: "极客精神" },
      { text: "负责创意策划与视觉", tag: "脑洞大开" },
      { text: "冲锋陷阵的执行者", tag: "行动派" },
      { text: "协调沟通的润滑剂", tag: "团队领袖" }
    ]
  },
  {
    title: "你最希望在大学里获得什么？",
    options: [
      { text: "硬核的专业技能", tag: "技术先锋" },
      { text: "丰富的艺术修养", tag: "审美在线" },
      { text: "强健的体魄与毅力", tag: "挑战极限" },
      { text: "更广阔的社会视野", tag: "社会责任感" }
    ]
  },
  {
    title: "遇到难题时，你的第一反应是？",
    options: [
      { text: "查阅文档，逻辑推导", tag: "逻辑控" },
      { text: "寻找灵感，另辟蹊径", tag: "创造力" },
      { text: "迎难而上，死磕到底", tag: "热血" },
      { text: "寻求互助，集思广益", tag: "同理心" }
    ]
  },
  {
    title: "哪句话最能代表你的座右铭？",
    options: [
      { text: "代码改变世界", tag: "科技探索" },
      { text: "生活即是艺术", tag: "艺术修养" },
      { text: "生命在于运动", tag: "体能王者" },
      { text: "赠人玫瑰手有余香", tag: "志愿奉献" }
    ]
  }
];

// ----------------------------------------------------------------------
// 组件：顶部导航栏 (Header)
// ----------------------------------------------------------------------
const Header = ({ currentView, setView }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        <div className="flex items-center space-x-2 cursor-pointer group" onClick={() => setView('home')}>
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl transition-all group-hover:shadow-lg group-hover:shadow-blue-200">
            L
          </div>
          <span className="text-2xl font-black text-gray-900 tracking-tight">LinkUp</span>
        </div>

        <nav className="hidden md:flex items-center space-x-10">
          <button onClick={() => setView('home')} className={`text-sm font-bold tracking-wide transition-all ${currentView === 'home' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}>
            首页
          </button>
          <button onClick={() => setView('matching')} className={`text-sm font-bold tracking-wide transition-all ${currentView === 'matching' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}>
            智能匹配
          </button>
        </nav>

        <div className="flex items-center space-x-4">
          <button onClick={() => setView('me')} className="w-11 h-11 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-white hover:shadow-md transition-all">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

// ----------------------------------------------------------------------
// 组件：测评侧抽屉 (Quiz Drawer)
// ----------------------------------------------------------------------
const QuizDrawer = ({ isOpen, onClose, onFinish }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);

  // 每次打开弹窗时重置进度
  React.useEffect(() => {
    if (isOpen) {
      setCurrentQ(0);
      setAnswers([]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOptionClick = (tag) => {
    const newAnswers = [...answers, tag];
    setAnswers(newAnswers);
    
    // 如果不是最后一题，进入下一题
    if (currentQ < QUIZ_QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      // 最后一题，完成测评并传递收集到的标签
      onFinish(newAnswers);
    }
  };

  const q = QUIZ_QUESTIONS[currentQ];
  const progress = ((currentQ + 1) / QUIZ_QUESTIONS.length) * 100;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 ease-out p-8">
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-2xl font-bold text-gray-900">智能匹配测评</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-1 space-y-10">
          <div className="space-y-3">
            <div className="flex justify-between text-xs font-bold text-blue-600 uppercase tracking-widest">
              <span>Progress</span>
              <span>{currentQ + 1} / {QUIZ_QUESTIONS.length}</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
          {/* 添加 key 以便在切换题目时触发动画 */}
          <div className="space-y-6 text-center py-10 animate-in slide-in-from-right-4 duration-300" key={currentQ}>
            <h4 className="text-2xl font-bold text-gray-800 leading-snug">{q.title}</h4>
            <div className="space-y-4 pt-4">
              {q.options.map((opt, i) => (
                <button 
                  key={i} 
                  onClick={() => handleOptionClick(opt.tag)}
                  className="w-full p-5 text-left border-2 border-gray-50 rounded-2xl hover:border-blue-600 hover:bg-blue-50 transition-all font-medium text-gray-700 hover:text-blue-700"
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// 视图：首页 (Home & Discovery)
// ----------------------------------------------------------------------
const HomeView = ({ onSelectClub }) => {
  const [filter, setFilter] = useState('全部');
  const [search, setSearch] = useState('');

  const filteredClubs = useMemo(() => {
    return CLUBS_DATA.filter(club => {
      const matchFilter = filter === '全部' || club.category === filter;
      const matchSearch = club.name.includes(search) || club.tags.some(t => t.includes(search));
      return matchFilter && matchSearch;
    });
  }, [filter, search]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
      <section className="relative pt-24 pb-28 px-6 bg-white overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
           <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-50 rounded-full blur-[100px] opacity-60"></div>
           <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-teal-50 rounded-full blur-[100px] opacity-60"></div>
        </div>

        <div className="relative max-w-5xl mx-auto text-center space-y-10">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-black text-gray-900 tracking-tighter leading-tight">
              发现你的<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400">大学主场</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">
              超过 100 个优质社团在这里等你，智能匹配助你一键加入。
            </p>
          </div>

          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-teal-400 rounded-3xl blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
            <div className="relative flex items-center bg-white border border-gray-100 shadow-2xl rounded-2xl p-2">
              <Search className="ml-4 text-gray-400 w-6 h-6" />
              <input 
                type="text" 
                placeholder="搜索社团名称、兴趣标签..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 px-4 py-4 bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-gray-900 placeholder:text-gray-400 text-lg"
              />
              <button className="bg-gray-900 text-white px-8 py-4 rounded-xl font-black hover:bg-blue-600 transition-all shadow-lg shadow-gray-200">
                搜索
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex items-center space-x-3 overflow-x-auto pb-10 no-scrollbar">
          {['全部', '学术科技', '文化艺术', '体育竞技', '志愿公益', '兴趣爱好'].map((cat) => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-7 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap ${
                filter === cat ? 'bg-gray-900 text-white shadow-xl translate-y-[-2px]' : 'bg-white text-gray-500 border border-gray-100 hover:bg-gray-50 hover:border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredClubs.map((club) => (
            <div 
              key={club.id} 
              onClick={() => onSelectClub(club)}
              className="bg-white border border-gray-100 rounded-[2.5rem] p-7 cursor-pointer hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-2 transition-all group relative overflow-hidden"
            >
              <div className="w-16 h-16 bg-gray-50 rounded-2xl mb-6 overflow-hidden border border-gray-50 group-hover:scale-110 transition-transform">
                 <img src={club.logo} alt={club.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{club.name}</h3>
              <p className="text-sm text-gray-400 font-medium mb-6 line-clamp-2">{club.slogan || club.sloganShort}</p>
              <div className="flex flex-wrap gap-2">
                {club.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-wider">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// ----------------------------------------------------------------------
// 视图：社团详情页 (Club Details)
// ----------------------------------------------------------------------
const DetailsView = ({ club, onBack, setView, applications, onApply }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // 判断当前社团是否已被申请
  const isApplied = applications.some(app => app.id === club.id);

  const handleShare = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // 如果没有详细数据，显示简易骨架（针对非 1 号社团）
  if (club.id !== 1) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-500">
        <button onClick={onBack} className="flex items-center text-gray-400 font-bold mb-10 hover:text-blue-600 transition-colors">
          <ChevronLeft className="w-6 h-6 mr-1" /> 返回首页
        </button>
        <div className="bg-gray-50 rounded-[3rem] p-20 text-center">
          <LayoutGrid className="w-16 h-16 text-gray-200 mx-auto mb-6" />
          <h2 className="text-4xl font-black text-gray-900 mb-4">{club.name} 详情完善中</h2>
          <p className="text-gray-400">测评期间仅展示“智航无人机社”的详细数据作为演示。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-500">
      <button onClick={onBack} className="flex items-center text-gray-400 font-bold mb-10 hover:text-blue-600 transition-colors group">
        <ChevronLeft className="w-6 h-6 mr-1 transition-transform group-hover:-translate-x-1" /> 返回社团广场
      </button>

      <div className="relative w-full h-[450px] rounded-[3rem] overflow-hidden mb-12 shadow-2xl">
        <img src={club.cover} alt="Cover" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-12">
           <div className="flex items-center space-x-4 mb-4">
             <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">{club.category}</span>
           </div>
           <h1 className="text-6xl font-black text-white mb-2">{club.name}</h1>
           <p className="text-white/80 text-xl font-medium italic">“ {club.slogan} ”</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-12">
          <section className="space-y-4">
            <h2 className="text-3xl font-black text-gray-900">社团简介</h2>
            <p className="text-gray-600 leading-loose text-lg">{club.description}</p>
            {club.wechat && (
              <div className="inline-flex items-center space-x-2 bg-green-50/80 text-green-700 px-4 py-2.5 rounded-xl border border-green-100 shadow-sm mt-4">
                <MessageCircle className="w-5 h-5" />
                <span className="font-bold text-sm tracking-wide">官方公众号：{club.wechat}</span>
              </div>
            )}
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black text-gray-900">常规活动</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {club.activities.map((act, i) => (
                <div key={i} className="bg-white border border-gray-100 p-8 rounded-[2rem] hover:shadow-xl transition-all border-l-4 border-l-blue-600">
                  <h4 className="font-black text-xl text-gray-900 mb-2">{act.title}</h4>
                  <p className="text-gray-500 text-sm">{act.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gray-50 p-10 rounded-[2.5rem] space-y-4">
            <h2 className="text-2xl font-black text-gray-900">招新要求</h2>
            <p className="text-gray-600 italic">“ {club.requirements} ”</p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black text-gray-900">社团成员介绍</h2>
            <div className="flex items-center p-6 bg-blue-50/50 rounded-[2rem] border border-blue-100 shadow-sm">
              <img src="https://api.dicebear.com/7.x/micah/svg?seed=Felix&backgroundColor=b6e3f4" alt="张远航" className="w-20 h-20 rounded-full border-4 border-white shadow-md mr-6" />
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">
                  张远航 
                  <span className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full ml-3 align-middle shadow-sm">社长</span>
                </h4>
                <p className="text-gray-500 text-sm mt-2">“欢迎来到智航，不管你是小白还是大神，和我一起探索天空的极限吧！”</p>
              </div>
            </div>
          </section>
        </div>

        <aside className="w-full lg:w-96">
          <div className="sticky top-28 space-y-6">
            <div className="bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-xl space-y-8">
              <div className="space-y-6">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center space-x-3 text-gray-500">
                     <User className="w-5 h-5" />
                     <span className="text-sm font-bold">负责人</span>
                   </div>
                   <span className="font-black text-gray-900">{club.leader}</span>
                 </div>
                 <div className="flex items-center justify-between">
                   <div className="flex items-center space-x-3 text-gray-500">
                     <Users className="w-5 h-5" />
                     <span className="text-sm font-bold">社员规模</span>
                   </div>
                   <span className="font-black text-gray-900">{club.members}</span>
                 </div>
                 <div className="flex items-center justify-between">
                   <div className="flex items-center space-x-3 text-gray-500">
                     <Phone className="w-5 h-5" />
                     <span className="text-sm font-bold">联系电话</span>
                   </div>
                   <span className="font-black text-gray-900">{club.contact}</span>
                 </div>
              </div>

              {!isApplied ? (
                <button 
                  onClick={() => setShowConfirmModal(true)}
                  className="w-full py-5 bg-blue-600 text-white rounded-[1.5rem] font-black text-xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:scale-[1.02] transition-all"
                >
                  立即一键申请
                </button>
              ) : (
                <div className="w-full py-5 bg-green-50 text-green-600 rounded-[1.5rem] font-black text-xl flex items-center justify-center space-x-2 border-2 border-green-200">
                  <CheckCircle className="w-6 h-6" />
                  <span>已提交申请</span>
                </div>
              )}
              <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                我们将自动提交您的“个人简历”
              </p>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={handleShare}
                className="flex-1 p-4 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-blue-600 transition-colors relative group"
              >
                {isCopied ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                {isCopied && <span className="absolute -top-10 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg animate-in slide-in-from-bottom-2 whitespace-nowrap">链接已复制</span>}
              </button>
              <button className="flex-1 p-4 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-blue-600 transition-colors group">
                <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* 确认申请弹窗 */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowConfirmModal(false)}></div>
          <div className="relative bg-white rounded-[2rem] p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
              <Info className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-3">确认提交简历？</h3>
            <p className="text-gray-500 font-medium mb-8 leading-relaxed">
              系统将向该社团发送您在“个人中心”填写的简历。如果您<span className="text-blue-600 font-bold">尚未完善简历</span>，建议先前往补充完整。
            </p>
            <div className="space-y-3">
              <button
                onClick={() => {
                  onApply(club);
                  setShowConfirmModal(false);
                }}
                className="w-full py-4 bg-blue-600 text-white rounded-xl font-black text-lg shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors"
              >
                确认提交
              </button>
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  setView('me'); 
                }}
                className="w-full py-4 bg-gray-50 text-gray-900 rounded-xl font-bold text-lg hover:bg-gray-100 border border-gray-100 transition-colors"
              >
                去完善简历
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="w-full py-3 text-gray-400 font-bold hover:text-gray-600 transition-colors"
              >
                稍后再说
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ----------------------------------------------------------------------
// 视图：智能匹配界面 (Matching/Results View)
// ----------------------------------------------------------------------
const MatchingView = ({ hasTakenQuiz, quizTags, onOpenQuiz, setView }) => {
  const tagToCategory = {
    "科技控": "学术科技", "极客精神": "学术科技", "技术先锋": "学术科技", "逻辑控": "学术科技", "科技探索": "学术科技",
    "文艺青年": "文化艺术", "脑洞大开": "文化艺术", "审美在线": "文化艺术", "创造力": "文化艺术", "艺术修养": "文化艺术",
    "运动达人": "体育竞技", "行动派": "体育竞技", "挑战极限": "体育竞技", "热血": "体育竞技", "体能王者": "体育竞技",
    "爱心大使": "志愿公益", "团队领袖": "志愿公益", "社会责任感": "志愿公益", "同理心": "志愿公益", "志愿奉献": "志愿公益"
  };

  const { recommendedClubs, resultImageUrl } = useMemo(() => {
    const tags = quizTags.length > 0 ? quizTags : ['科技控', '极客精神', '团队领袖'];
    const userCategories = tags.map(tag => tagToCategory[tag] || "兴趣爱好");
    
    // 计算主导类别
    const categoryCounts = userCategories.reduce((acc, cat) => {
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {});
    const dominantCategory = Object.keys(categoryCounts).reduce((a, b) => categoryCounts[a] > categoryCounts[b] ? a : b, "学术科技");

    // 根据主导类别分配不同风格的卡通头像 (使用 Dicebear API)
    let seed = "Felix"; // 科技类默认
    if (dominantCategory === "文化艺术") seed = "Mia";
    else if (dominantCategory === "体育竞技") seed = "Jack";
    else if (dominantCategory === "志愿公益") seed = "Lily";
    const resultImageUrl = `https://api.dicebear.com/7.x/micah/svg?seed=${seed}&backgroundColor=transparent`;

    // 根据用户的类别计算每个社团的匹配度分数
    const scoredClubs = CLUBS_DATA.map(club => {
      let score = 0;
      userCategories.forEach(cat => {
        if (club.category === cat) score += 20;
      });
      // 生成一个更真实的匹配度百分比 (根据分数波动)
      const matchPercentage = Math.min(99, Math.floor(65 + score + (Math.random() * 10)));
      return { ...club, matchScore: score, matchPercentage };
    });

    // 取分数最高的前三个社团
    const recommendedClubs = scoredClubs.sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);

    return { recommendedClubs, resultImageUrl };
  }, [quizTags]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto">
        {!hasTakenQuiz ? (
          <div className="bg-white border border-gray-100 rounded-[3rem] p-16 text-center space-y-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="w-24 h-24 bg-blue-600 text-white rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-blue-200 rotate-12">
              <Sparkles className="w-12 h-12" />
            </div>
            <div className="space-y-4">
              <h2 className="text-5xl font-black text-gray-900 tracking-tighter">发现你的无限可能</h2>
              <p className="text-gray-500 text-xl font-medium">AI 将基于你的兴趣画像，从 100+ 社团中精准匹配最优选。</p>
            </div>
            <button onClick={onOpenQuiz} className="inline-flex items-center space-x-3 bg-gray-900 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-blue-600 hover:shadow-2xl hover:scale-[1.05] transition-all">
              <span>立即开始测评</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        ) : (
          <div className="space-y-10 animate-in slide-in-from-bottom-6 duration-1000">
            {/* 重新测评按钮置于最上方 */}
            <div className="flex justify-between items-center px-4">
              <h3 className="text-2xl font-black text-gray-900">你的智能测评报告</h3>
              <button onClick={onOpenQuiz} className="text-gray-500 hover:text-blue-600 transition-colors text-sm font-bold flex items-center space-x-1 border border-gray-200 px-5 py-2.5 rounded-full hover:bg-blue-50 hover:border-blue-200 bg-white shadow-sm hover:shadow-md">
                <Sparkles className="w-4 h-4" />
                <span>重新进行测评</span>
              </button>
            </div>

            <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-black rounded-[3rem] p-12 text-white shadow-2xl flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="w-64 h-64 border-[1px] border-white/10 rounded-full flex items-center justify-center relative scale-110">
                  <div className="absolute inset-4 border border-white/5 rounded-full animate-pulse"></div>
                  <div className="w-40 h-40 bg-blue-500/10 rounded-full flex items-center justify-center">
                    <img src={resultImageUrl} alt="Personality Avatar" className="w-32 h-32 drop-shadow-2xl" />
                  </div>
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-blue-600 px-3 py-1 rounded-full text-[10px] font-black">{quizTags[0] || '技术先锋'}</div>
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <h2 className="text-4xl font-black">匹配报告已就绪</h2>
                <p className="text-white/60 text-lg leading-relaxed font-medium">
                  根据分析，你展现了极强的<span className="text-white font-bold">{quizTags[1] || '逻辑思维'}</span>与<span className="text-white font-bold">{quizTags[2] || '创造力'}</span>，更倾向于在相关兴趣领域寻找成就感。
                </p>
                <div className="flex flex-wrap gap-3">
                  {(quizTags.length > 0 ? quizTags : ['科技控', '极客精神', '团队领袖']).map((t, idx) => (
                    <span key={idx} className="px-4 py-2 bg-white/10 rounded-xl text-xs font-bold text-blue-300 border border-white/5">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8 pt-6">
              <h3 className="text-3xl font-black text-gray-900">为您推荐 (Top 3)</h3>
              <div className="space-y-4">
                {recommendedClubs.map((club) => (
                  <div key={club.id} onClick={() => setView('details')} className="p-8 bg-white border border-gray-100 rounded-[2.5rem] flex items-center group cursor-pointer hover:shadow-2xl transition-all border-l-0 hover:border-l-8 hover:border-l-blue-600">
                    <div className="w-20 h-20 bg-gray-50 rounded-2xl mr-8 overflow-hidden">
                       <img src={club.logo} className="w-full h-full object-cover" alt={club.name} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-2xl font-black text-gray-900 mb-1">{club.name}</h4>
                      <p className="text-gray-400 font-medium">{club.slogan || club.sloganShort}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-black text-blue-600">{club.matchPercentage}%</div>
                      <div className="text-[10px] text-gray-300 font-black uppercase tracking-tighter">Match Rate</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// 视图：个人中心 (Me View)
// ----------------------------------------------------------------------
const MeView = ({ resumeData, setResumeData, applications, setView }) => {
  const [tab, setTab] = useState('resume');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleChange = (field, value) => {
    setResumeData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row gap-12">
        <aside className="w-full lg:w-72 space-y-6">
          <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 text-center shadow-xl">
             <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-400 text-white rounded-[2rem] mx-auto mb-6 flex items-center justify-center font-black text-4xl shadow-lg shadow-blue-100">
               {resumeData.name ? resumeData.name.charAt(0).toUpperCase() : 'U'}
             </div>
             <h4 className="font-black text-2xl text-gray-900 mb-1">{resumeData.name || '未命名同学'}</h4>
             <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{resumeData.major || '专业未填写'}</p>
          </div>
          <nav className="bg-gray-50 rounded-[2.5rem] p-3 space-y-2">
            {[ {id: 'resume', name: '我的简历', icon: LayoutGrid}, {id: 'apply', name: '申请记录', icon: CheckCircle} ].map(item => (
              <button 
                key={item.id} 
                onClick={() => setTab(item.id)}
                className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl font-bold transition-all ${tab === item.id ? 'bg-white text-blue-600 shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 bg-white border border-gray-100 rounded-[3rem] p-12 shadow-sm">
          {tab === 'resume' ? (
            <div className="space-y-10">
               <div className="space-y-2">
                 <h2 className="text-4xl font-black text-gray-900">我的简历</h2>
                 <p className="text-gray-400 font-medium text-lg">一份出色的简历能大幅提升录取率。</p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {[ 
                   { label: '姓名', key: 'name', placeholder: '请输入你的真实姓名' }, 
                   { label: '学号', key: 'studentId', placeholder: '请输入学号' }, 
                   { label: '联系电话', key: 'phone', placeholder: '请输入手机号' }, 
                   { label: '所在专业', key: 'major', placeholder: '如：计算机科学与技术' } 
                 ].map(field => (
                   <div key={field.key} className="space-y-3">
                     <label className="block text-sm font-black text-gray-400 uppercase tracking-widest">{field.label}</label>
                     <input 
                       type="text"
                       value={resumeData[field.key]}
                       onChange={(e) => handleChange(field.key, e.target.value)}
                       placeholder={field.placeholder}
                       className="w-full h-14 bg-gray-50 rounded-2xl border border-gray-100 px-6 text-gray-900 font-bold outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all placeholder:text-gray-300 placeholder:font-medium"
                     />
                   </div>
                 ))}
                 <div className="md:col-span-2 space-y-3">
                   <label className="block text-sm font-black text-gray-400 uppercase tracking-widest">个人特长与以往经历</label>
                   <textarea 
                     value={resumeData.experience}
                     onChange={(e) => handleChange('experience', e.target.value)}
                     placeholder="分享你的故事、擅长的技能或者曾经参与的活动..."
                     className="w-full h-40 bg-gray-50 rounded-3xl border border-gray-100 p-6 text-gray-900 font-bold outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all placeholder:text-gray-300 placeholder:font-medium resize-none"
                   ></textarea>
                 </div>
               </div>
               <button 
                 onClick={handleSave}
                 className={`px-10 py-5 rounded-2xl font-black text-lg transition-all shadow-xl flex items-center justify-center space-x-2 ${
                   isSaved ? 'bg-green-500 text-white shadow-green-200' : 'bg-gray-900 text-white hover:bg-blue-600 shadow-gray-100'
                 }`}
               >
                 {isSaved ? (
                   <>
                     <CheckCircle className="w-5 h-5" />
                     <span>已保存</span>
                   </>
                 ) : (
                   <span>更新简历信息</span>
                 )}
               </button>
            </div>
          ) : (
            <div className="space-y-10">
               <h2 className="text-4xl font-black text-gray-900">申请记录</h2>
               
               {applications.length === 0 ? (
                 <div className="text-center py-24 bg-gray-50 rounded-[2.5rem] border border-gray-100">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                      <LayoutGrid className="w-8 h-8 text-gray-300" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">暂无申请记录</h3>
                    <p className="text-gray-400 mb-8 font-medium">你还没有向任何社团投递简历，快去探索吧！</p>
                    <button 
                      onClick={() => setView('home')}
                      className="bg-white text-blue-600 border border-blue-100 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-sm"
                    >
                      前往广场
                    </button>
                 </div>
               ) : (
                 <div className="space-y-4">
                   {applications.map((app, index) => (
                     <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-8 bg-gray-50 rounded-[2rem] border border-gray-100 group hover:bg-white hover:shadow-xl transition-all gap-4">
                        <div className="flex items-center space-x-6">
                          <div className="w-16 h-16 bg-white rounded-2xl overflow-hidden group-hover:scale-105 transition-transform shrink-0 border border-gray-100">
                            <img src={app.logo} alt={app.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-2xl font-black text-gray-900">{app.name}</p>
                            <p className="text-sm text-gray-400 font-bold mt-1">提交于 {app.applyDate}</p>
                          </div>
                        </div>
                        <div className="px-6 py-2 bg-blue-100 text-blue-600 rounded-full text-xs font-black uppercase self-start sm:self-auto shrink-0">
                          {app.status}
                        </div>
                     </div>
                   ))}
                 </div>
               )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// 主入口 (App)
// ----------------------------------------------------------------------
export default function App() {
  const [view, setView] = useState('home');
  const [selectedClub, setSelectedClub] = useState(null);
  const [isQuizOpen, setQuizOpen] = useState(false);
  const [hasTakenQuiz, setHasTakenQuiz] = useState(false);
  const [quizTags, setQuizTags] = useState([]);
  
  // 全局状态：申请记录 & 简历数据
  const [applications, setApplications] = useState([]);
  const [resumeData, setResumeData] = useState({
    name: '',
    studentId: '',
    phone: '',
    major: '',
    experience: ''
  });

  const handleFinishQuiz = (tags) => {
    setQuizTags(tags);
    setHasTakenQuiz(true);
    setQuizOpen(false);
    setView('matching');
  };

  const openClubDetail = (club) => {
    setSelectedClub(club);
    setView('details');
    window.scrollTo(0, 0);
  };

  const handleApply = (club) => {
    // 获取当天的日期 YYYY-MM-DD
    const today = new Date();
    const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    setApplications(prev => [
      { ...club, applyDate: dateString, status: '待面试' }, 
      ...prev
    ]);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] text-gray-900 selection:bg-blue-100 font-sans">
      <Header currentView={view} setView={setView} />
      
      <main>
        {view === 'home' && <HomeView onSelectClub={openClubDetail} />}
        {view === 'matching' && (
          <MatchingView 
            hasTakenQuiz={hasTakenQuiz} 
            quizTags={quizTags}
            onOpenQuiz={() => setQuizOpen(true)} 
            setView={setView} 
          />
        )}
        {view === 'me' && (
          <MeView 
            resumeData={resumeData} 
            setResumeData={setResumeData} 
            applications={applications} 
            setView={setView} 
          />
        )}
        {view === 'details' && selectedClub && (
          <DetailsView 
            club={selectedClub} 
            onBack={() => setView('home')} 
            setView={setView}
            applications={applications}
            onApply={handleApply}
          />
        )}
      </main>

      <QuizDrawer 
        isOpen={isQuizOpen} 
        onClose={() => setQuizOpen(false)} 
        onFinish={handleFinishQuiz}
      />
    </div>
  );
}
