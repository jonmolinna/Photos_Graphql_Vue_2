import { createApp, h, provide } from 'vue'

// VUETIFY
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Graphql
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'

// COMPONENTS
import App from './App.vue'
import router from './router'

// GRAPHQL CONFIG
const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

// VUETIFY CONFIG
const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})

app.use(router).use(vuetify).mount('#app')
