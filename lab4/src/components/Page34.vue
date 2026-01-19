<script>
export default {
    // Replace defineProps with the props object
    props: {
        msg: String
    },
    data() {
        return {
            content: 'xin chào các bạn',
            className: 'text-red',
            styleData: 'font-size: 5rem'
        }
    },
    methods: {
        change() {
            this.className = 'text-blue';
            this.content = 'Đã đổi màu xanh nhé';
        }
    }
}
</script>