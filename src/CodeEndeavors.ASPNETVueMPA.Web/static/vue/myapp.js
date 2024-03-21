import Toast, { useToast } from "vue-toastification";
import { SunIcon, MoonIcon, PencilSquareIcon, ArrowLeftIcon } from '@heroicons/vue/20/solid'
import ProgressBar from "./components/ProgressBar.vue";
import Counter from "./components/Counter.vue";

class myapp {
    
    app = null;
    loading = null;
    
    components = {
        ProgressBar,
        Counter
    }

    icons = {
        SunIcon, MoonIcon, PencilSquareIcon, ArrowLeftIcon,
    }

    initApp(root) {
        const { ref, computed } = Vue;
        this.app = Vue.createApp(root);
        this.loading = ref(false);
    }

    mount(selector) {
        this.app.use(Toast);
        this.app.mount(selector);
    }

    addMessage(text, type) {
        const toast = useToast();
        if (type == 'success') {
            toast.success(text);
        } else if (type == 'error') {
            toast.error(text);
        } else {
            toast.info(text);
        }
    }

    registerComponent(tag, template, component) {
        const { ref } = Vue;

        if (template) {
            component.template = template.innerHTML;
        }

        this.app.component(tag, component);   
        var element = document.createElement(tag);
        if (template) {
            template.replaceWith(element);
        }
    }    

    resolveUrl(url) {
        if (url.indexOf('~/') == 0) {
            return url.replace('~/', `${window.location.protocol}//${window.location.host}/`);
        }
        return url;
    }

    async ajax({url, queryString, method, body, contentType}) {
        return new Promise((resolve, reject) => {
            if (queryString) {
                url += '?' + new URLSearchParams(queryString);
            }
            if (contentType == null) {
                contentType = 'application/json';
            }
            
            this.loading.value = true;
            fetch(this.resolveUrl(url), {
                headers: { 'Content-Type': contentType },
                method: method ? method : (body ? 'POST' : 'GET'),
                body: body != null ? (contentType == 'application/json' ? JSON.stringify(body) : body) : null
            })
            .then(response => {
                this.loading.value = false;
                if (!response.ok) {
                    return Promise.reject(response);
                }
                else {
                    if (response.status != 204) { //no content
                        return response.json();
                    }
                    return null;
                }
            })
            .then(data => {
                resolve(data);
            })
            .catch(async (response) => {
                this.loading.value = false;
                this.addMessage(response.statusText, 'error');
                reject(response);
            });
        });
    }

}

window.myapp = new myapp(); //ensure access from our js