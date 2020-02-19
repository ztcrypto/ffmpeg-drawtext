<template>
  <div>
    <b-form-row>
      <b-col>
        <b-form-group label="Height Percent" label-for="height">
          <b-form-input
            v-bind:value="value.height"
            @input="update('height', $event)"
            placeholder="Height Percent"
            ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="Line Height Percent" label-for="lheight">
          <b-form-input
            v-bind:value="value.lheight"
            @input="update('lheight', $event)"
            placeholder="Line Height Percent"
            ></b-form-input>
        </b-form-group>
      </b-col>
    </b-form-row>
    <b-form-row>
      <b-col>
        <b-form-group label="Count" label-for="count">
          <b-form-input
            v-bind:value="value.count"
            @input="update('count', $event)"
            placeholder="Count"
            ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="Width Percent" label-for="width">
          <b-form-input
            v-bind:value="value.width"
            @input="update('width', $event)"
            placeholder="Width Percent"
            ></b-form-input>
        </b-form-group>
      </b-col>
    </b-form-row>
    <b-form-row>
      <b-col>
        <b-form-group label="Frame" label-for="frame">
          <b-form-input
            v-bind:value="value.frame"
            @input="update('frame', $event)"
            placeholder="Frame"
            ></b-form-input>
        </b-form-group>
      </b-col>
    </b-form-row>
  </div>
</template>

<script>

export default {
  name: 'Filters',
  props: ['value', 'container'],
  data() {
    return {
      rate: '',
    };
  },
  methods: {
    update(key, value) {
      this.$emit('input', { ...this.value, [key]: value });
    },
    updateText(key, value) {
      const txt = this.value.text;
      txt[key - 1] = value;
      this.$emit('input', { ...this.value, text: txt });
    },
  },
};
</script>
