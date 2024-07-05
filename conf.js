export const conf =  {
    apps: [
      {
        name: 'DaFeng',
        exec_mode: 'cluster',
        instances: '1',
        script: './server/index.mjs',
        env: {
          NITRO_PORT: 3333
        }
      }
    ]
  }
