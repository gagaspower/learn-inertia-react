import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Flowbite } from "flowbite-react";

const customTheme = {
    navbar: {
        root: {
            base: "bg-white px-2 py-2 dark:border-gray-700 dark:bg-gray-800 sm:px-4 rounded-xl",
            inner: {
                base: "flex justify-end items-center",
                fluid: {
                    on: "",
                    off: "container",
                },
            },
        },
    },
};

export function NavbarComponent() {
    return (
        <Flowbite theme={{ theme: customTheme }}>
            <Navbar fluid>
                <div className="flex md:order-2">
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar
                                alt="User settings"
                                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                rounded
                            />
                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">User Dummy</span>
                        </Dropdown.Header>
                        <Dropdown.Item>Ubah Password</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>Keluar</Dropdown.Item>
                    </Dropdown>
                </div>
            </Navbar>
        </Flowbite>
    );
}
