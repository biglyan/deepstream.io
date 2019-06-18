import { DeepstreamConfig } from '../../src/types'
import { LOG_LEVEL } from '../../src/constants'

export const getServerConfig = (port: number): DeepstreamConfig => ({
    serverName : `server-${port}`,
    logLevel: LOG_LEVEL.WARN,
    showLogo : false,

    rpc: {
      ackTimeout: 10,
      responseTimeout: 10,
    },

    listen: {
      shuffleProviders     : false,
    },

    permission: {
      type    : 'config',
      options : {
        path: './test-e2e/config/permissions-open.json'
      } as any
    },

    connectionEndpoints: {
      websocket: {
        name: 'uws',
        options: {
          port,
          urlPath: '/e2e',
          maxAuthAttempts              : 2,
          unauthenticatedClientTimeout : 200,
        } as any
      },
      http: {
        name: 'http',
        options: {
          port: Number(port) + 200,
          host: '0.0.0.0',
          allowAuthData: true,
          enableAuthEndpoint: true,
          authPath: '/auth',
          postPath: '/',
          getPath: '/',
          healthCheckPath: '/health-check',
          allowAllOrigins: true
        } as any
      }
    },

    monitoring: {
      type: 'default',
      options: {
        reportInterval: 200,
        permissionLogLimit: 3,
        technicalErrorLogLimit: 3
      } as any
    },

    cluster: {
      message: {
        type: 'default',
        options: {

        } as any
      },
      registry: {
        type: 'default',
        options: {
          keepAliveInterval: 200,
          activeCheckInterval: 200
        } as any
      },
      locks: {
        type: 'default',
        options: {
          timeout                : 1500,
          requestTimeout         : 1500,
        } as any
      },
      state: {
        type: 'default',
        options: {
          reconciliationTimeout : 100,
        } as any
      }
    }
  })
