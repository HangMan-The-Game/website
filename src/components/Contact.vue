<script setup></script>

<template>
    <section>
        <h1 class="text-center my-5 fw-bold">Contact us</h1>
        <h3 class="text-center my-1 fw-bold">Our email is not available at this time.</h3>
        <p class="fs-3 text-center my-5">We are sorry for the inconvenience, but at the moment you can only contact us via
            <a href="https://www.instagram.com/hangmanit_/">Instagram <i class="bi bi-box-arrow-up-right"></i></a>.
        </p>

        <form class="w-50 mx-auto shadow p-3 mb-5 border rounded border-2 p-2">
            <div class="input-group mb-3">
                <span class="input-group-text">First name</span>
                <input type="text" aria-label="First name" class="form-control">
                <span class="input-group-text">Last name</span>
                <input type="text" aria-label="Last name" class="form-control">
            </div>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                <!-- <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> -->
            </div>
            <div class="mb-3">
                <!-- <span class="input-group-text">With textarea</span> -->
                <label for="exampleInputEmail1" class="form-label">Type your Message here</label>
                <textarea class="form-control" aria-label="With textarea"></textarea>
        </div>
        <!--             <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                                                                                                                                                                                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                                                                                                                                                                                </div> -->
            <div class="text-center">
                <button id="disabled" type="submit" class="btn btn-primary btn-lg disabled fs-5">Submit <span
                        class="badge rounded-pill text-bg-warning">WIP</span></button>
            </div>
    </form>
    <!--         <div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">@</span>
                <input type="text" class="form-control" placeholder="Username" aria-label="Username"
                    aria-describedby="basic-addon1">
            </div>

            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username"
                    aria-describedby="basic-addon2">
                <span class="input-group-text" id="basic-addon2">@example.com</span>
            </div>

            <div class="mb-3">
                <label for="basic-url" class="form-label">Your vanity URL</label>
                <div class="input-group">
                    <span class="input-group-text" id="basic-addon3">https://example.com/users/</span>
                    <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4">
                </div>
                <div class="form-text" id="basic-addon4">Example help text goes outside the input group.</div>
            </div>

            <div class="input-group mb-3">
                <span class="input-group-text">$</span>
                <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
                <span class="input-group-text">.00</span>
            </div>

            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Username" aria-label="Username">
                <span class="input-group-text">@</span>
                <input type="text" class="form-control" placeholder="Server" aria-label="Server">
                                                                                                                                                                                                        </div>
                                                                                                                                                                                                    </div> -->


    </section>
</template>

<style scoped>
form {
    transition: transform .2s;
}

form:hover {
    transform: scale(1.1);
}

a {
    text-decoration: none;
    color: #FF4D4D;
}

a:hover {
    color: #B33636;
}

.btn-primary {
    background-color: #FF4D4D;
    border-color: #FF4D4D;
}

.btn-primary:hover {
    background-color: #B33636;
    border-color: #FF4D4D;
}

.btn-primary:active {
    background-color: #4e0909;
    border-color: #FF4D4D;
}

#disabled {
    background-color: #ffd3d3;
    color: #FF4D4D;
    border-color: #FF4D4D;
    cursor: not-allowed !important;
}
</style>