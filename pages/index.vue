<template>
  <UContainer class="my-10">
    <header>
      <h1 class="text-2xl">
        Construtor de Gráficos e Tabelas a partir da API do IBGE
      </h1>
      <p>
        Conforme você for selecionando as opções, novas opções serão mostradas,
        ao final você poderá gerar seu gráfico ou tabela.
      </p>
    </header>
    <main class="mt-5">
      <FormAppForm />
      <AppResult />
    </main>
  </UContainer>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Construtor de Gráficos e Tabelas a partir da API do IBGE",
  description:
    "Conforme você for selecionando as opções, novas opções serão mostradas, ao final você poderá gerar seu gráfico ou tabela.",
});
</script>
