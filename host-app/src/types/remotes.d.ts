declare module 'loginApp/Login' {
  import React from 'react';

  interface LoginProps {
    onLogin: () => void;
  }

  const Login: React.ComponentType<LoginProps>;
  export default Login;
}

declare module 'todoApp/TodoList' {
  import React from 'react';

  const TodoList: React.ComponentType;
  export default TodoList;
}