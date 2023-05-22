import { gql } from "@apollo/client";


export const GET_CHAR = gql`
query getCharacters {
    Page(page: 5, perPage: 10) {
        characters(sort: ROLE) {
          id
          name {
            full
          }
          image {
            large
          }
        }
      }
}
`

export const GET_THREADS = gql`
query getThreads($page: Int!) {
  Page(page: $page, perPage: 30) {
    threads {
      id
      title
      body
      replyCount
    }
  }
}
`

export const GET_THREAD_COMMENTS = gql`
query getThreadComments($threadId: Int! $page: Int! $perPage: Int!) {
  Page(page: $page, perPage: $perPage) {
    threadComments(threadId: $threadId) {
      id
      comment
      childComments
    }
  }
}
`