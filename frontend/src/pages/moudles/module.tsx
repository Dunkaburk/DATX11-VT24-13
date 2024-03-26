import React, { useState } from 'react';
import { useRouter } from 'next/router';
import callAPI from "@/hooks/apiHooks";

const Moudle = () => {
  const [module, useModule] = useState([]); // https://www.youtube.com/watch?v=v0nvwwdeV6I
  const [task, useTask] = useState([]);
  const router = useRouter();
  const category = callAPI({ route: "/api/module/getModules", method: "GET", data: {} });

    return (
      <div>
        <h1>{`Category ${category}`}</h1>
      </div>
    );
  };

export default Moudle;
