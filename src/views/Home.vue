<template>
  <div>
    <find-books></find-books>
    <books-list></books-list>
  </div>
</template>

<script>
import findBooks from './../components/FindBooks';
import booksList from './../components/BooksList';

export default {
  name: 'home',
  components: {
    findBooks,
    booksList
  }
}
</script>
