<template>
  <div>
    <button type="button" class="button" @click="$parent.execCommand('bold')"><i class="fa fa-bold" aria-hidden="true"></i>{{$parent.locale["bold"]}}</button>
    <button type="button" class="button" @click="$parent.execCommand('italic')"><i class="fa fa-italic" aria-hidden="true"></i>{{$parent.locale["italic"]}}</button>
    <button type="button" class="button" @click="$parent.execCommand('underline')"><i class="fa fa-underline" aria-hidden="true"></i>{{$parent.locale["underline"]}}</button>
    <button type="button" class="button" @click="$parent.execCommand('strikeThrough')"><i class="fa fa-strikethrough" aria-hidden="true"></i>{{$parent.locale["strike through"]}}</button>
    <button type="button" class="button" @click="$parent.execCommand('subscript')"><i class="fa fa-subscript" aria-hidden="true"></i>{{$parent.locale["subscript"]}}</button>
    <button type="button" class="button" @click="$parent.execCommand('superscript')"><i class="fa fa-superscript" aria-hidden="true"></i>{{$parent.locale["superscript"]}}</button>
  </div>
</template>
<script>
 export default {
   module: {}
 }
</script>