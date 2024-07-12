<template>
    <v-card
            class="py-4 mx-8 mt-8 w-20 px-5"
            
            style="background-color: rgba(43, 43, 43, 0.533); color: rgba(240, 248, 255, 0.955);"
            rounded="lg"
            variant="outlined"
          >
          <div class="pb-4">
            <slot name="question" ></slot>
          </div>
          
          <slot name="qst"></slot>
    </v-card>
</template>