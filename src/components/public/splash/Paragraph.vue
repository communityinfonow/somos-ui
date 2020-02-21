<template>
  <div>
    <p v-if="language === 'en'">
      Our neighborhoods are so much more than just the location of the buildings we live in. Each neighborhood offers something beautiful, inspiring, and entirely unique. However,
      <i>where we live</i> plays a big role in
      <i>how long we live</i>, and the longest- and shortest-lived neighborhoods are separated by
      <i>nearly 20 years</i> in average life expectancy.
      <b>Somos Neighbors</b> connects us with each other, with an understanding of the neighborhoods we live in, and with action to close the life expectancy gap. If we work together we can live long healthy lives in the neighborhoods we love, no matter where in the county we live.
    </p>

    <p v-if="language === 'es'">
      Nuestros vecindarios son mucho más que la ubicación de los edificios en los que vivimos. Cada vecindario ofrece algo hermoso, inspirador y completamente único. Sin embargo, el lugar 
      <i>donde vivimos</i> juega un papel importante en 
      <i>cuánto tiempo vivimos</i>, y los vecindarios con la longevidad más larga y más corta están separados por casi 20 años en promedio. 
      <b>Somos Neighbors</b> nos conecta a todos, con entendimiento de los vecindarios en los que vivimos y con acciones para cerrar la brecha de longevidad. Si trabajamos juntos, podemos vivir vidas largas y saludables en los vecindarios que amamos, sin importar en qué parte del condado vivamos.
    </p>
  </div>
</template>

<script>
import translate from "@/mixins/translate";
export default { name: "Paragraph", mixins: [translate] };
</script>

<style>
</style>