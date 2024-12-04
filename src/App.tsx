import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';

// 使用toCamelCase将kebab-case或snake_case转换为camelCase
const toCamelCase = (str: string) => {
  return str.replace(/[-_]([a-z])/g, (g) => g[1].toUpperCase());
};

// 转换className为CSS Modules格式并收集所有类名
const transformClassNames = (code: string) => {
  const classNames = new Map<string, string>(); // 存储原始类名和转换后的类名
  
  // 匹配className="xxx"和className={`xxx`}的模式
  const classNameRegex = /className=(?:["'`]\s*([^"'`]+)\s*["'`]|\{(?:`([^`]+)`|["']([^"']+)["'])\})/g;
  
  // 转换代码
  const transformedCode = code.replace(classNameRegex, (match, simple, template, string) => {
    const classContent = simple || template || string;
    if (!classContent) return match;

    // 处理多个class的情况
    const classes = classContent.split(/\s+/).filter(Boolean);
    const transformedClasses = classes.map((cls: string) => {
      // 排除已经是模块引用的情况（styles.xxx）
      if (cls.startsWith('styles.')) return cls;
      if (cls.startsWith('iconfont')) return `"${cls}"`;
      
      const camelCase = toCamelCase(cls);
      classNames.set(cls, camelCase); // 保存原始类名和驼峰类名的映射
      return `styles.${camelCase}`;
    });

    // 如果只有一个class
    if (transformedClasses.length === 1) {
      return `className={${transformedClasses[0]}}`;
    }
    
    // 多个class使用模板字符串
    return `className={\`${transformedClasses.join(' ')}\`}`;
  });

  // 生成SCSS内容
  const scssContent = Array.from(classNames.entries())
    .map(([originalName, camelCase]) => `.${camelCase} {\n  // Original: ${originalName}\n}`)
    .join('\n\n');

  return {
    transformedCode: `import styles from './style.module.scss';\n\n${transformedCode}`,
    scssContent
  };
};

const ClassNameTransformer = () => {
  const [inputCode, setInputCode] = useState<string | undefined>('');
  const [outputCode, setOutputCode] = useState('');
  const [scssCode, setScssCode] = useState('');

  useEffect(() => {
    if (inputCode) {
      const { transformedCode, scssContent } = transformClassNames(inputCode);
      setOutputCode(transformedCode);
      setScssCode(scssContent);
    }
  }, [inputCode]);

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="p-4 bg-gray-100 border-b">
        <h1 className="text-xl font-bold">TSX Class Name Transformer</h1>
      </div>
      <div className="flex-1 grid grid-cols-3 gap-4 p-4">
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold mb-2">Input TSX</h2>
          <div className="flex-1 border rounded overflow-hidden">
            <Editor
              height="100%"
              defaultLanguage="typescript"
              value={inputCode}
              onChange={setInputCode}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
              }}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold mb-2">Transformed TSX</h2>
          <div className="flex-1 border rounded overflow-hidden">
            <Editor
              height="100%"
              defaultLanguage="typescript"
              value={outputCode}
              theme="vs-dark"
              options={{
                readOnly: true,
                minimap: { enabled: false },
                fontSize: 14,
              }}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold mb-2">Generated SCSS Module</h2>
          <div className="flex-1 border rounded overflow-hidden">
            <Editor
              height="100%"
              defaultLanguage="scss"
              value={scssCode}
              theme="vs-dark"
              options={{
                readOnly: true,
                minimap: { enabled: false },
                fontSize: 14,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassNameTransformer;