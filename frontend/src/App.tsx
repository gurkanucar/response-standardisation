import {Outlet} from "react-router-dom";
import React, {Suspense} from "react";
import {Spin} from "antd";

function App() {
  return (
    <Suspense fallback={<Spin size="large" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}/>}>
      <Outlet/>
    </Suspense>
  );
}

export default App;
