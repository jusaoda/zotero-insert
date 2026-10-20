window.SelectionZHSettings = {
  init() {
    const element = name => document.getElementById('selection-zh-' + name);
    const api = Zotero.SelectionZH;
    const status = message => { element('status').textContent = message; };
    const current = () => api.getSettings(element('provider').value);
    const refreshKey = () => {
      const hasKey = current().hasKey;
      element('key').value = '';
      element('key').placeholder = hasKey ? '已保存；留空保留原 Key，输入新 Key 可替换' : '填写所选服务 API Key';
      element('key-state').textContent = hasKey ? '当前服务已保存 API Key（内容已隐藏）' : '当前服务尚未配置 API Key。免费模式无需 Key。';
    };
    const loadProvider = () => {
      const settings = current();
      element('model').value = settings.model;
      element('base-url').textContent = 'Base URL：' + settings.baseURL;
      const models = settings.provider === 'sjtu' ? [
        ['deepseek-chat','DeepSeek V4 Flash'], ['deepseek-reasoner','DeepSeek V4 Flash（推理）'],
        ['minimax-m2.7','MiniMax-M2.7'], ['qwen3.6-27b','Qwen3.6-27B']
      ] : [['deepseek-flash','DeepSeek Flash'], ['deepseek-v4-pro','DeepSeek V4 Pro']];
      element('presets').replaceChildren();
      for (const [value,label] of models) {
        const option = document.createElementNS('http://www.w3.org/1999/xhtml','option');
        option.value=value; option.textContent=label+'（'+value+'）'; element('presets').append(option);
      }
      element('presets').value = settings.model;
      refreshKey();
    };
    const settings = api.getSettings();
    element('mode').value = settings.mode;
    element('provider').value = settings.provider;
    loadProvider();
    element('provider').addEventListener('change',loadProvider);
    element('presets').addEventListener('change',()=>{element('model').value=element('presets').value;});
    const save = async () => {
      await api.saveSettings({ mode: element('mode').value, provider: element('provider').value, model: element('model').value, key: element('key').value });
      refreshKey();
    };
    element('save').addEventListener('click', async () => {
      try { await save(); status('已保存。重新选择英文即可使用' + (element('mode').value === 'ai' ? ' AI 模式。' : '免费模式。')); }
      catch (_) { status('保存失败，请检查模型名称和 Key 格式。'); }
    });
    element('test').addEventListener('click', async () => {
      element('test').disabled = true;
      try { await save(); status('正在测试 AI 翻译…'); status('AI 测试成功：' + await api.test()); }
      catch (error) { status(error.message); }
      finally { element('test').disabled = false; }
    });
    element('clear').addEventListener('click', () => {
      try { api.clearAPIKey(element('provider').value); refreshKey(); status('已清除当前服务 API Key。'); }
      catch (_) { status('清除失败，请重试。'); }
    });
  }
};
