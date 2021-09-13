from flask import Flask, request, jsonify
from flask_cors import *
import argparse

app = Flask(__name__)
CORS(app, resources=r'/*')


@app.route('/api/myurl', methods=['POST'])
def dealWithFunc():
    # 将请求中的参数作为模型的输入
    data = request.form.to_dict()
    params = data.get('***')
    # 将请求中的文件作为模型的输入
    fileparams = request.files['file']

    #
    # 将参数传入模型计算，此处编写调用模型的代码
    #

    # 返回结果给前端
    if code == 0:
        res = jsonify({
            'code': 0,
            'msg': 'ok',
            'data': {
                '***': ***
            }
        })
    else:
        res = jsonify({
            'code': code,
            'msg': 'error',
        })

    # 添加跨域设置
    res.headers['Access-Control-Allow-Origin'] = '*'
    res.headers['Access-Control-Allow-Methods'] = 'POST,GET,OPTIONS'
    res.headers['Access-Control-Allow-Headers'] = 'x-requested-with,content-type'

    return res

    def main():
        parser = argparse.ArgumentParser()
        parser.add_argument('--port', default=8800, type=int)
        args = parser.parse_args()

        app.debug = False  # change this to True if you want to debug
        app.run('0.0.0.0', args.port)


if __name__ == '__main__':
    main()
