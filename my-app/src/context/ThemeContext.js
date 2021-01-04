import React from 'react';

// 创建context
export const ThemeContext = React.createContext({ themeColor: 'blue' });

// 接收者
export const ThemeProvider = ThemeContext.Provider;

// 消费者
export const ThemeConsumer = ThemeContext.Consumer;