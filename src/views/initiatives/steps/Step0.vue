<template>
  <div>
    <h1 class="title is-1 has-text-centered">{{$t('forms.user.addInitiative.step0.title')}}</h1>
    <div class="content has-text-centered">
      <p v-for="(p,index) in $t('forms.user.addInitiative.step0.text')" :key="index">{{p}}</p>
      <p>
        <button class="button is-primary is-outlined is-large is-rounded" @click="$emit('forward')">
          {{$t('forms.user.addInitiative.step0.start')}}
        </button>
        </p>
    </div>
  </div>
</template>
