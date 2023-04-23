<template>
    <label :class = "{'active': value}" class = "toggle__button">
        <input type = "checkbox" id="aa" :checked = "value"  @click = "handleClick">
        <span class = "toggle__switch"></span>
    </label>
</template>

<script>


export default {
    name: 'toggle',
    props: {
        value: {
            type: Boolean, 
            required: true
        }
    },

    methods: {
        handleClick() {
            this.$emit("input", !this.value);
        }
    }
}
</script>

<style scoped lang = "scss">
    .toggle__button {
        width: 30px;
        height: 14px;
        user-select: none;
        cursor: pointer;
    }
    .toggle__button input[type="checkbox"] {
        opacity: 0;
        position: absolute;
        width: 1px;
        height: 1px;
    }
    .toggle__button .toggle__switch {
        display:inline-block;
        height:8px;
        border-radius:6px;
        width:30px;
        background: transparent;
        border: 3px solid $brand-grey-300;
        position:relative;
        transition: all .25s;
    }
    .toggle__button .toggle__switch::after, 
    .toggle__button .toggle__switch::before {
        content: "";
        position: absolute;
        display: block;
        height: 14px;
        width: 14px;
        border-radius: 50%;
        left: -3px;
        top: -6px;
        border: 1px solid white;
        transform: translateX(0);
        transition: all .25s cubic-bezier(.5, -.6, .5, 1.6);
    }
    .toggle__button .toggle__switch::after {
        background: $brand-grey-300;
    }
    .toggle__button .toggle__switch::before {
        background: $brand-grey-300;
        opacity:0;
    }

    .active .toggle__switch::after,
    .active .toggle__switch::before{
        transform: translateX( 40px - 18px );
    }
    .active .toggle__switch::after {
        left: -8px;
        background: $brand-blue-500;
    }
</style>