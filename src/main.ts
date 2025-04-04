import { createApp, h, provide } from 'vue'
import { createPinia } from 'pinia'

// VUETIFY
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

// Graphql
import { ApolloClient, createHttpLink, InMemoryCache, split } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { setContext } from '@apollo/client/link/context'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'

// COMPONENTS
import App from './App.vue'
import router from './router'
import AuthService from './services/AuthService'

// PINIA
const pinia = createPinia()

// GRAPHQL CONFIG
const httpLink = createHttpLink({
  // uri: 'http://localhost:3000/graphql',
  uri: 'https://photos-graphql-nestjs-vue.onrender.com/graphql',
})

const wsLink = new WebSocketLink({
  // uri: `ws://localhost:3000/graphql`,
  uri: 'wss://photos-graphql-nestjs-vue.onrender.com/graphql',
  options: {
    reconnect: true,
  },
})

const authLink = setContext((_, { headers }) => {
  const authService = new AuthService()
  const token = authService.getToken()

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  // httpLink
  authLink.concat(httpLink),
)

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  // link: authLink.concat(httpLink),
  link,
  cache,
})

// VUETIFY CONFIG
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})

app.use(router).use(pinia).use(vuetify).mount('#app')
