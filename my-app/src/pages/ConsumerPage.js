import React from 'react';
import { ThemeConsumer } from '../context/ThemeContext'

export default function ConsumerPage() {
  return (
    <ThemeConsumer>
      {
        ctx => {
          console.log('ConsumerPage ctx ==> ', ctx);
          return (
            <div className={ctx.themeColor}>
              ConsumerPage
            </div>
          );
        }
      }
    </ThemeConsumer>
  )
}