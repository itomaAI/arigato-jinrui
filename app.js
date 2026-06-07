const { createApp, ref, computed, onMounted } = Vue;

// モックデータ (将来的にGitHub PagesのJSONをFetchする想定)
const mockData = [
  {
    id: 1,
    target: "ANA 羽田発 那覇行きの機長さん",
    content: "5月10日のフライトで、子供が泣いてしまった時にCAさんを通じて機長さんからシールを頂きました。おかげで子供も笑顔になり、本当に救われました。素晴らしいフライトをありがとうございました。",
    date: "2026-05-12",
    tags: ["ANA", "航空", "パイロット"]
  },
  {
    id: 2,
    target: "新宿駅前のマクドナルドの清掃スタッフさん",
    content: "今朝、コーヒーをこぼしてしまった際、嫌な顔一つせずすぐに拭いてくださり、「お怪我はないですか？」と優しく声をかけていただきました。朝からとても温かい気持ちになりました。",
    date: "2026-05-20",
    tags: ["マクドナルド", "清掃", "接客"]
  },
  {
    id: 3,
    target: "クロネコヤマト いつもの配達員さん",
    content: "いつも重い荷物を笑顔で5階まで運んでいただき、本当にありがとうございます。不在がちで再配達になってしまうことも多く申し訳ないですが、あなたの笑顔にいつも元気をもらっています。",
    date: "2026-06-01",
    tags: ["ヤマト運輸", "物流", "配達"]
  },
  {
    id: 4,
    target: "株式会社itomaAI 山内様",
    content: "素晴らしいOSと開発体験をありがとうございます。おかげで毎日が楽しいです。",
    date: "2026-06-07",
    tags: ["itomaAI", "エンジニア", "感謝"]
  }
];

const app = createApp({
  setup() {
    const currentTab = ref('send');
    
    // 送信フォーム関連
    const form = ref({
      target: '',
      content: ''
    });
    const isSubmitting = ref(false);
    const submitSuccess = ref(false);

    const submitMessage = async () => {
      isSubmitting.value = true;
      submitSuccess.value = false;
      
      // TODO: 明日提供されるWebhook URLへPOSTする処理を実装
      // const webhookUrl = "YOUR_WEBHOOK_URL";
      // await fetch(webhookUrl, { ... });
      
      // 現状はモックとして1秒待機
      setTimeout(() => {
        isSubmitting.value = false;
        submitSuccess.value = true;
        form.value.target = '';
        form.value.content = '';
        
        setTimeout(() => {
          submitSuccess.value = false;
        }, 3000);
      }, 1000);
    };

    // 検索関連
    const searchQuery = ref('');
    const messages = ref(mockData);
    
    // Fuse.js の初期化
    let fuse;
    onMounted(() => {
      fuse = new Fuse(messages.value, {
        keys: ['target', 'content', 'tags'],
        threshold: 0.3, // 曖昧検索のしきい値
      });
    });

    const searchResults = computed(() => {
      if (!searchQuery.value) return [];
      if (!fuse) return [];
      return fuse.search(searchQuery.value);
    });

    const recentMessages = computed(() => {
      // 最新のメッセージを数件表示
      return [...messages.value].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
    });

    return {
      currentTab,
      form,
      isSubmitting,
      submitSuccess,
      submitMessage,
      searchQuery,
      searchResults,
      recentMessages
    };
  }
});

app.mount('#app');