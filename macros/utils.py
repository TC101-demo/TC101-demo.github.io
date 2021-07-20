import glob

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

