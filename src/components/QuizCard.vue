<template>
    <v-card
            class="pt-6 mx-8 px-6"
            
            style="background-color: rgba(43, 43, 43, 0.533); color: rgba(240, 248, 255, 0.955);"
            rounded="lg"
            variant="tonal"
          >
          <div class="pb-4">
            <slot name="question" ></slot>
          </div>
          
          <slot name="qst"></slot>
    </v-card>
</template>
