import glob

global_render_order = 0

def define_env(env):
    """
    This is the hook for defining variables, macros and filters

    - variables: the dictionary that contains the environment variables
    - macro: a decorator function, to declare a macro.
    - filter: a function with one of more arguments,
        used to perform a transformation
    """

    @env.macro
    def get_list_pages(root_folder):
        folder_list = glob.glob(root_folder + '*.md')
        return(folder_list)

    @env.macro
    def check_substring(page, sub_str):
        if page is None:
            return False
        root_path = page.url
        if (root_path.find(sub_str) == -1):
            return False
        return True
    
    @env.macro
    def render_order(extra_str):
        global global_render_order
        res_str = f"{extra_str}: {global_render_order}"
        print(res_str)
        global_render_order += 1
        return res_str

